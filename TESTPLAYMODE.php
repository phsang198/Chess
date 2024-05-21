<?php
    session_start();
    include('includes/header.php');
?>
    <link href="TESTPLAYMODE.css" rel="stylesheet">
    <script src="./js/game.js" type="module"></script>
</head>
<body>
    <?php
        include('includes/navbar.php');
    ?>
    <div class="container">
        <div class="row">
            <div class="col-md-3">
                <div class="center">
                    <div id="myBoard"style="width: 470px; margin: 0 auto;"></div>
                    <br>
                    <button id="changeTheme" type="button" style="align-items: center;">Random Theme</button>
                    <button id="restart" type="button" style="align-items: center;">Restart</button>
                </div>
            </div>

            <div class="col-md-5">
                <textarea id="pgn" readonly>
                
                </textarea>
            </div>
        </div>
    </div>
</body>
</html>
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
 </script>