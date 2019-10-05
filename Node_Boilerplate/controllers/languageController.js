exports.en = (req, res, next) => {
    res.cookie('i18n', 'en');
    res.redirect('/validate');
};

exports.de = (req, res, next) => {
    res.cookie('i18n', 'de');
    res.redirect('/validate');
};