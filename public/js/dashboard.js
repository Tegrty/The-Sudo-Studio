const newBlogHandler = async (event) => {
  event.preventDefault();
  // Collect values from the new blog form
  const title = document.querySelector("#blog-title").value.trim();
  const content = document.querySelector("#blog-content").value.trim();
  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/blogs/`, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
      console.log("New blog created");
    } else {
      alert(response.statusText);
    }
  }
};
console.log("adding event listener");
document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newBlogHandler);
