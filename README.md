# GitHub App Access Token Helper

This Node.js script is designed to fetch an access token for a GitHub App using GitHub App authentication. The script utilizes the `@octokit/auth-app` library for creating GitHub App authentication and the `node-fetch` library for making HTTP requests.

## Usage

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/codepusher-platform/github-app-auth-helper.git
   cd github-app-auth-helper
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Environment Variables:**

   Before running the script, make sure to set the required environment variables:

   - `GITHUB_APP_ID`: GitHub App ID.
   - `GITHUB_PRIVATE_KEY_PATH`: Path to the private key file on your local machine.
   - `GITHUB_CLIENT_ID`: GitHub App Client ID.
   - `GITHUB_CLIENT_SECRET`: GitHub App Client Secret.

   Example:

   ```bash
   export GITHUB_APP_ID=your_app_id
   export GITHUB_PRIVATE_KEY_PATH=/path/to/private-key.pem
   export GITHUB_CLIENT_ID=your_client_id
   export GITHUB_CLIENT_SECRET=your_client_secret
   ```

4. **Run the Script:**

   ```bash
   node script.js
   ```

   The script will fetch the GitHub App access token and print it to the console.

## Dependencies

- `@octokit/auth-app`: Library for authenticating as a GitHub App.
- `node-fetch`: A lightweight module that brings `window.fetch` to Node.js.

## Notes

- Ensure that the required environment variables are set before running the script.
- This script fetches the GitHub App access token and logs it to the console. Adjust the script as needed for your specific use case.

Feel free to customize and integrate this script into your workflow for GitHub App authentication. If you encounter any issues or have questions, please refer to the script comments or reach out for assistance.


# Running with Docker

You can run the GitHub App Access Token Fetcher script in a Docker container for a consistent and isolated environment. Follow these steps to use the provided Dockerfile:

1. **Build the Docker Image:**

   ```bash
   docker build -t github-app-token-fetcher .
   ```

   Replace `github-app-token-fetcher` with your preferred image name.

2. **Set Environment Variables:**

   Before running the Docker container, ensure you have set the required environment variables. You can use the `-e` flag with the `docker run` command to pass these variables.

   ```bash
   docker run -e GITHUB_APP_ID=your_app_id \
              -e GITHUB_PRIVATE_KEY_PATH=/secret/private-key.pem \
              -e GITHUB_CLIENT_ID=your_client_id \
              -e GITHUB_CLIENT_SECRET=your_client_secret \
              github-app-token-fetcher
              -v /local/folder/of/your/private-key:/secret
   ```

   Make sure to replace `your_app_id`, `/secret/private-key.pem`, `your_client_id`, and `your_client_secret` with your GitHub App information.

3. **View the Output:**

   The script will fetch the GitHub App access token and print it to the console within the Docker container.

   ```bash
   GitHub App Access Token: your_access_token
   ```

   Adjust the Docker run command and environment variables according to your GitHub App configuration.

This Docker setup ensures a consistent environment for running the script across different systems. If you encounter any issues or need further assistance, feel free to reach out.
