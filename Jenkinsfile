pipeline {
  agent any
  environment {
    JMETER_HOME = '/opt/jmeter'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }
    stage('Install') {
      steps { sh 'npm ci' }
    }
    stage('Start App') {
      steps {
        sh 'nohup node app.js & sleep 5'
      }
    }
    stage('Run JMeter Test') {
      steps {
        sh """
          \$JMETER_HOME/bin/jmeter -n \
            -t summary_report.jmx \
            -l results.jtl \
            -Jjmeter.save.saveservice.output_format=xml
        """
      }
    }
  }

  post {
    always {
      perfReport(
        sourceDataFiles: 'results.jtl',
        errorFailedThreshold: 10,
        errorUnstableThreshold: 3,
        compareBuildPrevious: true,
        modeEvaluation: false
      )
    }
  }
}  // <-- This closing brace was missing in your file
