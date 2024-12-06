# Use the official AWS Lambda Node.js 18 base image as the builder stage
FROM public.ecr.aws/lambda/nodejs:18 AS builder

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

ARG GITHUB_TOKEN

COPY .npmrc ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application (if necessary)
RUN npm run build:lambda

# Use the official AWS Lambda Node.js 18 base image for the final stage
FROM public.ecr.aws/lambda/nodejs:18

# Set the working directory to Lambda task root
WORKDIR ${LAMBDA_TASK_ROOT}

# Copy the build output from the builder stage to the Lambda task root
COPY --from=builder /usr/src/app/dist/* ./

# Copy the .env file to the Lambda task root
COPY .env .

COPY *.p12 ./

RUN ls -a

# Set the CMD to your handler (could be index.handler or whatever your entry point is)
CMD ["index.handler"]
