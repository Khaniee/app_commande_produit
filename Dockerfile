FROM node

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
RUN npm install
RUN npm install react-scripts -g

# add app
COPY . ./

# start app
# CMD ["npm", "start"]
CMD ["tail", "-f", "/dev/null"]