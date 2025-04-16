<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Input Page</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/autosize.js/6.0.1/autosize.min.js"
        integrity="sha512-OjjaC+tijryqhyPqy7jWSPCRj7fcosu1zreTX1k+OWSwu6uSqLLQ2kxaqL9UpR7xFaPsCwhMf1bQABw2rCxMbg=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body>
    <h1>Enter Text</h1>
    <form action="Serv" method="POST">
        <label for="inputText">Text:</label>
        <textarea id="textInput" name="inputText" placeholder="Write your request here..."></textarea>
        <button type="submit">Submit</button>
    </form>
    <script>
        autosize(document.getElementById('textInput'))
    </script>
</body>

</html>