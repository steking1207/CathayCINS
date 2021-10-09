
//將外站傳來的白名單Query帶至所有<a>上
$(function () {
    if (!(typeof Querys === 'undefined')) {
        $("a").each(function (index) {
            if ($(this).prop('href')) {
                var a = document.createElement('a');
                a.href = $(this).prop('href');
                var query = '';
                var flag = true;
                $.each(Querys, function (index, value) {
                    if (flag && !a.search) {
                        query += '?' + index + '=' + value;
                        flag = false;
                    }
                    else {
                        query += '&' + index + '=' + value;
                        flag = false;
                    }
                });
                $(this).attr('href', $(this).prop('href') + query);
            }
        });
    }
});
