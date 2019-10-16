FROM argoproj/argocd:v1.2.3

# Switch to root for the ability to perform install
USER root

# base os pre-reqs for node
RUN apt-get update && apt-get install -y curl

# Install node
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

# Remove temp files from installing software
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Switch back to non-root user
USER argocd

RUN npm install solsa
