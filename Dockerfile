FROM node
ADD /temp /temp
RUN cd /temp && npm install

EXPOSE 3000
WORKDIR /temp