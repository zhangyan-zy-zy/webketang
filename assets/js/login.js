$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })


    // 从layui中获取form表单
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
        // 密码确认输入
        , repwd: function (value) {
            //    通过函数获取表单的数据
            // 获取密码的值
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "两次输入的密码不一样"
            }
        }
    })



    // 调用接口进行,用户注册,
    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        $.post("/api/reguser", { username: $('#reg_form [name=username]').val(), password: $('#reg_form [name=password]').val() },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录')
                // 人进行模拟登录
                $('#link_login').click()
            })
    })




    // 调用接口,进行用户登录
    $('#login_form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // data:{
            //     username:$('#login_form [name=username]').val(),
            //     password:$('#login_form [name=password]').val()
            // },
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                // console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})
