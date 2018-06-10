define(['laravel'], function (laravel) {
    return laravel
        .controller('index', [function () {
            currentNenu('index');
        }])
        .controller('research', [function () {
            currentNenu('research');
        }])
        .controller('publications', [function () {
            currentNenu('publications');
        }])
        .controller('projects', [function () {
            currentNenu('projects');
        }])
        .controller('awards', [function () {
            currentNenu('awards');
        }])
        .controller('photos', [function () {
            currentNenu('photos');
        }])
        .controller('contact', [function () {
            currentNenu('contact');
        }])
        ;
});