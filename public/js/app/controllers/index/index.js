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
        .controller('courses', [function () {
            currentNenu('courses');
        }])
        .controller('contact', [function () {
            currentNenu('contact');
        }])
        ;
});