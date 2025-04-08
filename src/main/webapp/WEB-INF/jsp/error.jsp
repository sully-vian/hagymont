<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error</title>
</head>
<body>
    <% int statusCode = (int) request.getAttribute("statusCode"); %>
    <% String stackTrace = (String) request.getAttribute("stackTrace"); %>
    <% String requestPath = (String) request.getAttribute("requestPath"); %>
    <h1>Error</h1>
    <p>Status code: <%= statusCode %></p>
    <p>Request path: <%= requestPath %></p> <!-- Display the request path -->
    <% if (stackTrace != null) { %>
        <pre><%= stackTrace %></pre>
    <% } else { %>
        <p>No stack trace available.</p>
    <% } %>
</body>
</html>
