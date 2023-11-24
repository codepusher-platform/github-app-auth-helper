import { createAppAuth } from "@octokit/auth-app";
import { readFileSync } from "fs";
import fetch from "node-fetch";

async function getGithubAppAccessToken() {
  // Read GitHub App information from environment variables
  const appId = process.env.GITHUB_APP_ID;
  const privateKeyPath = process.env.GITHUB_PRIVATE_KEY_PATH;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  // Parameter Validation
  if (!appId || !privateKeyPath || !clientId || !clientSecret) {
    throw new Error(
      "Missing required parameters for GitHub App authentication."
    );
  }
  // Read Private Key
  const privateKey = readFileSync(privateKeyPath, "utf-8");

  // Create App Authentication
  const auth = createAppAuth({
    appId,
    privateKey,
    clientId,
    clientSecret,
  });

  const appAuthentication = await auth({ type: "app" });

  let installationId;

  // Fetch installationId
  try {
    const response = await fetch("https://api.github.com/app/installations", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${appAuthentication.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const installations = await response.json();

    if (installations.length === 0) {
      throw new Error("No installations found for the app.");
    }

    installationId = installations[0].id;
  } catch (error) {
    console.error("Error fetching installations:", error.message);
    throw error;
  }

  // Fetch accessToken
  try {
    const response = await fetch(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${appAuthentication.token}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const accessTokens = await response.json();
    return accessTokens.token;
  } catch (error) {
    console.error("Error fetching accessToken:", error.message);
    throw error;
  }
}

// Call the function
getGithubAppAccessToken()
  .then((accessToken) => {
    console.log("GitHub App Access Token:", accessToken);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });
