const apiKey = "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";

async function fetchGitHubUser() {
  const username = document.getElementById('username').value.trim();
  const resultDiv = document.getElementById('result');

  if (!username) {
    resultDiv.innerHTML = `<p class="error">Please enter a username!</p>`;
    return;
  }

  resultDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error('User not found or API limit reached');
    }

    const data = await response.json();

    resultDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="Avatar">
      <h3>${data.name || 'No Name Provided'}</h3>
      <p><strong>Username:</strong> ${data.login}</p>
      <p><strong>Public Repos:</strong> ${data.public_repos}</p>
      <p><strong>Followers:</strong> ${data.followers}</p>
      <p><strong>Following:</strong> ${data.following}</p>
      <a href="${data.html_url}" target="_blank">Visit Profile</a>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
  }
}
