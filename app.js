const SUPABASE_URL = 'https://tyhqwaunmanubqqyifwj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ykUNI3N6ih0sgmcN4K7OZw_MRYljw-U';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

$(document).ready(function(){
    // Hiện/Ẩn mật khẩu (giữ nguyên của bạn)
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        $(this).prev().attr('type', $(this).hasClass('open') ? 'text' : 'password');
    });

    // Xử lý Đăng nhập
    $('.form-submit').click(async function(e) {
        e.preventDefault(); // Chặn chuyển trang ngay lập tức
        const email = $('.form-input[type="text"]').val();
        const password = $('.form-input[type="password"]').val();

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email, 
            password: password
        });

        if (error) {
            alert("Đăng nhập thất bại: " + error.message);
        } else {
            // Lưu thông tin user vào bộ nhớ tạm để start.html dùng
            localStorage.setItem('hubi_user', JSON.stringify(data.user));
            window.location.href = 'start.html';
        }
    });
});
$(document).ready(function(){
    // Xử lý ẩn hiện mật khẩu
    $('#eye').click(function(){
        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if($(this).hasClass('open')){
            $(this).prev().attr('type', 'text');
        }else{
            $(this).prev().attr('type', 'password');
        }
    });

    // Thêm hiệu ứng focus cho form-group
    $('.form-input').focus(function(){
        $(this).parent().css('border-color', 'rgba(255, 255, 255, 0.6)');
    }).blur(function(){
        $(this).parent().css('border-color', 'rgba(255, 255, 255, 0.1)');
    });
});