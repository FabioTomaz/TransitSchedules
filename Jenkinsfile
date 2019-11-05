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
        sh 'sudo docker-compose down'
        sh 'sudo docker-compose up --build -d'
    }
  }
  catch (err) {
    throw err
  }
}