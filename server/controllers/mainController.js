/**
 * GET / 
 * Homepage
 */

exports.homepage = async (req, res) => {
    const locals = {
        title: 'NodeJs Notes',
        description: 'Free NodeJS Notes app.',
    }
    res.status(200).render('index', {
        locals, 
        layout: '../views/layouts/front-page'
    });
}

/**
 * GET / 
 * About
 */

exports.about = async (req, res) => {
    const locals = {
        title: 'About - Nodejs Notes',
        description: 'Free NodeJS Notes app.',
    }

    res.status(200).render('about', locals)
}