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
      if(env.BRANCH_NAME == 'master'){
        sh 'docker build -t node-app --no-cache .'
        sh 'docker tag node-app localhost:5000/node-app'
        sh 'docker push localhost:5000/node-app'
        sh 'docker rmi -f node-app localhost:5000/node-app'
      }
    }
  }
  catch (err) {
    throw err
  }
}