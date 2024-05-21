<nav>
    <!--Logo-->
    <div class="logo">
        <img src="./public/logo.png" alt="Logo Image"> 
    </div>
    <div class="nav-brand">
            <span class="nav-text" id="brand-text"></span>
    </div>
    <!--Nav Item-->
    <div class="hamburger">
        <i class="fas fa-bars"></i>
    </div>
    <!--Nav link-->
    <ul class="nav-link">
        <li><a href="TESTINDEX.php">HOME</a></li>
        <li><a href="TESTPLAYMODE.php">PLAYMODE</a></li>
        <li><a href="TESTMULTIMODE.php">ONLINE</a></li>
        <li><a href="TESTSHOP.php">SHOP</a></li>
        <li><a href="TESTBLOG.php">BLOG</a></li>
        <li><a href="TESTFAQS.php">FAQS</a></li>
        <?php if(!isset($_SESSION['verified_user_id'])) : ?>
            <li><button class="login-btn" href="login.html" onclick="login()">Login</button></li>
            <?php else: ?>
            <li>
                <a href="logout.php">Logout</a> 
            </li> 
        <?php endif; ?>
    </ul>
</nav>
