<?php
    session_start();
    include('includes/header.php');
?>
    <link href="TESTBLOG.css" rel="stylesheet">
</head>
<body>
    <?php
        include('includes/navbar.php');
    ?>
    <div class="mainbody">
        <div class="header-post">
            <h1>Social Platform</h1>
            <form class="post-form">
                <textarea placeholder="Share your experience here ..."></textarea>
                <button type="submit">Post</button>
            </form>
        </div>
        <div class="main-content">
            <div class="post">
                <img src="https://picsum.photos/100" alt="Profile Picture">
                <div class="onPost">
                    <h2>Username</h2>
                    <p>Date</p>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, sapien sit amet tristique fringilla, velit magna varius nulla, at dictum metus metus et enim. </p>
                <div class="post-actions">
                    <button class="like-button">Like</button>
                    <button class="comment-button">Comment</button>
                </div>
                <div class="post-likes">
                    <p>100 likes</p>
                </div>
            
                <div class="post-comments">
                    <div class="comment">
                        <img src="https://picsum.photos/50" alt="Profile Picture">
                        <div class="comment-header">
                            <h3>Username</h3>
                            <p>Date</p>
                        </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <button class="delete-comment">Delete</button>
                    </div>
                
                    <div class="comment">
                        <img src="https://picsum.photos/50" alt="Profile Picture">
                        <div class="comment-header">
                            <h3>Admin</h3>
                            <p>Date</p>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <button class="delete-comment">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<script>
    // Srcipt Navbar
    // Brandtext
    document.addEventListener('DOMContentLoaded',function AppearOnce()
    {
        const brandtext = "ChessMate";
        const brandElement = document.getElementById('brand-text');
        function type(index)
        {
            brandElement.textContent=brandtext.slice(0,index);
            if (index <= brandtext.length)
            setTimeout(() => type(index+1),500);
            else
                {
                    setTimeout(() =>
                        {
                            document.removeEventListener('DOMContentLoaded',AppearOnce);
                            brandElement.textContent = brandtext;
                        },1000);
                }
        }
        type(0);
    });
    // Hambuger
    document.addEventListener('DOMContentLoaded', function () {
        const hamburgerIcon = document.querySelector('.hamburger');
        const navLink = document.querySelector('.nav-link');
        const navItems = document.querySelectorAll('.nav-link li a');
        const loginBtn = document.querySelector('.login-btn');

        hamburgerIcon.addEventListener('click', function () {
            navLink.classList.toggle('show');
            if (navLink.classList.contains('show')) {
                navItems.forEach(item => item.style.display = 'block');
                loginBtn.style.display = 'block';
            } else {
                navItems.forEach(item => item.style.display = 'none');
                loginBtn.style.display = 'none';
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1000) {
                navItems.forEach(item => item.style.display = 'block');
                loginBtn.style.display = 'block';
            } else {
                navItems.forEach(item => item.style.display = 'none');
                loginBtn.style.display = 'none';
            }
        });
    });
    // Post
    const form = document.querySelector('.post-form');
    const textarea = document.querySelector('textarea');
    const posts = document.querySelector('.main-content');

    form.addEventListener('submit', function(e) {
    e.preventDefault();

    const post = document.createElement('div');
    post.classList.add('post');

    post.innerHTML = `
        <img src="https://picsum.photos/100" alt="Profile Picture">
        <div class="post-header">
        <h2>Username</h2>
        <p>Just now</p>
        </div>
        <p>${textarea.value}</p>
        <div class = "post-actions">
        <button class="like-button">Like</button>
        <button class="comment-button">Comment</button>
        </div>
        <div class="post-likes">
        <p>0 likes</p>
        </div>
        <div class="post-comments">
        <form class="comment-form">
            <textarea placeholder="Add a comment"></textarea>
            <button>Post</button>
        </form>
        </div>
    `;

    posts.appendChild(post);

    textarea.value = '';
    });

    posts.addEventListener('click', function(e) {
    if (e.target.classList.contains('like-button')) {
        const likes = e.target.parentElement.nextElementSibling;
        likes.innerHTML = `<p>${parseInt(likes.textContent) + 1} likes</p>`;
    }

    if (e.target.classList.contains('comment-button')) {
        const commentForm = e.target.parentElement.nextElementSibling.nextElementSibling;
        commentForm.style.display = 'block';
    }

    if (e.target.tagName === 'BUTTON') {
        const form = e.target.parentElement;
        const textarea = form.querySelector('textarea');
        const comments = form.previousElementSibling;

        if (textarea.value) {
        const comment = document.createElement('div');
        comment.classList.add('comment');
        comment.innerHTML = `
            <img src="https://via.placeholder.com/50x50" alt="Profile Picture">
            <div class="comment-header">
            <h3>Username</h3>
            <p>Just now</p>
            </div>
            <p class="comment-body">${textarea.value}</p>
        `;

        comments.appendChild(comment);

        textarea.value = '';
        form.style.display = 'none';
        }
    }
    });

    const deleteCommentButtons = document.querySelectorAll('.delete-comment');

    deleteCommentButtons.forEach(button => {
    button.addEventListener('click', event => {
        const comment = event.target.parentNode;
        comment.style.display = 'none';
    });
    });

</script>
</html>