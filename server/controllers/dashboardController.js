const Notes = require('../models/Notes');
const mongoose = require('mongoose');

exports.dashboardControllerGet = async (req, res) => {
    const perPage = 8;
    const page = parseInt(req.query.page) || 1;

    const locals = {
        title: 'Dashboard',
        description: 'Free NodeJS Notes app.',
    };



    try {

      
  
        // Получаем ObjectId пользователя (на всякий случай явно преобразуем)
        const userId = new mongoose.Types.ObjectId(req.user.id);

        // Получаем заметки, принадлежащие пользователю, с пагинацией и сортировкой
        const notes = await Notes.aggregate([
            { $match: { user: userId } },
            { $sort: { updatedAt: -1 } },
            {
                $project: {
                    title: { $substr: ["$title", 0, 30] },
                    body: { $substr: ["$body", 0, 100] },
                    createdAt: 1
                }
            },
            { $skip: perPage * (page - 1) },
            { $limit: perPage }
        ]);

        // Считаем сколько всего заметок у пользователя для пагинации
        const count = await Notes.countDocuments({ user: userId });

        // Рендерим страницу dashboard с данными
        res.render('dashboard/index', {
            userName: req.user.firstName,
            notes,
            locals,
            layout: '../views/layouts/dashboard',
            current: page,
            pages: Math.ceil(count / perPage)
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};



/**
 * Get /
 * View Specefic Note
 */

exports.dashboardViewNote = async (req, res) => {
    try {
        const note = await Notes.findById({ _id: req.params.id })
            .where({ user: req.user.id })
            .lean();

        if (note) {
            res.render('dashboard/view-notes', {
                noteID: req.params.id,
                note,
                layout: '../views/layouts/dashboard'
            }); 
        } else {
            res.send('Note not found or not authorized');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};



/**
 * PUT /
 * Update Specific Note
 */

exports.dashboardUpdateNote = async(req, res) => {
    try{
         const noteId = req.params.id;

        await Notes.findOneAndUpdate(
            { _id: noteId, user: req.user.id }, // ищем по id заметки + id пользователя
            { title: req.body.title, body: req.body.body, updatedAt: Date.now() }
        )
            res.redirect('/dashboard')
    } catch(error){
        console.log(error)
    }
}


/**
 * DELETE /
 * Delete Note
 */

exports.dashboardDeleteNote = async (req, res) => {
    try {
        await Notes.deleteOne({ _id: req.params.id, user: req.user.id });
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};


/**
 * 
 *  GET /
 * Add Notes
 */

exports.dashboardAddNotes = async(req, res) => {
    res.render('dashboard/add', {
        layout: '../views/layouts/dashboard'
    })
}



/**
 * POST 
 * Add Notes
 */
exports.dashboardAddNotesSubmit = async(req, res) => {
    try{
        req.body.user = req.user.id;
        await Notes.create(req.body)
        res.redirect('/dashboard')
    }   catch(error){
        consolele.log(error)
    }
}

/**
 * GET /
 * Search
 */

exports.dashboardSearch = async(req, res) => {
    try{
        res.render('dashboard/search', {
            searchResults: '', 
            layout: '../views/layouts/dashboard'
        })
    }catch(error){

    }
}


/**
 * POST /
 * Search For Notes
 */

exports.dashboardSearchSubmit = async(req, res) => {
    try{    
        let searchTerm = req.body.searchTerm;
        const searchNoSpecial = searchTerm.replace(/[^a-zA-Z0-9 ]/g, ""); 

        const searchResults = await Notes.find({
            $or: [
                {title: {$regex: new RegExp(searchNoSpecial, 'i') }},  
                {body: {$regex: new RegExp(searchNoSpecial, 'i') }}, 
            ]
        }).where({user: req.user.id });

        res.render('dashboard/search', {
            searchResults, 
            layout: '../views/layouts/dashboard'
        })


    }  catch(error){

    }
}