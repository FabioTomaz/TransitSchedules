node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'printenv'
    }
    stage('Deploy'){
        sh 'docker-compose down'
        sh 'docker-compose up --build'
    }
  }
  catch (err) {
    throw err
  }
}