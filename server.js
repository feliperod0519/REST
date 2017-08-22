var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var movies =
[
                {
                    "Id": "1",
                    "Title": "Aliens",
                    "Director": "James Cameron",
                    "Year": "1986",
                    "Rating": "8.5"
                },
                {
                    "Id": "2",
                    "Title": "Big Trouble in Little China",
                    "Director": "John Carpenter",
                    "Year": "1986",
                    "Rating": "7.3"
                },
                {
                    "Id": "3",
                    "Title": "Killer Klowns from Outer Space",
                    "Director": "Stephen Chiodo",
                    "Year": "1988",
                    "Rating": "6.0"
                },
                {
                    "Id": "4",
                    "Title": "Heat",
                    "Director": "Michael Mann",
                    "Year": "1995",
                    "Rating": "8.3"
                },
                {
                    "Id": "5",
                    "Title": "The Raid: Redemption",
                    "Director": "Gareth Evans",
                    "Year": "2011",
                    "Rating": "7.6"
                }
];
var app = express();
var request = require('request');
var router = express.Router();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
router.get('/test', function (req, res)
{
    var data = { "name": "Test Joe", "url": "http://www.test-joe.co" };
    res.json(data);
});
router.get('/', function (req, res)
{
    res.json(movies);
});
router.get('/:id', function (req, res)
{
    console.log(req.params.id);
    _.each(movies, function (elem, index)
    {
        if (elem.Id === req.params.id) {
            res.json(movies[index]);
        }
        else {
            res.json(200,{ error: 'Not found' });
        }
    });
});
router.get('/api', function (req, res)
{
    request({}, function (e, response, body)
    {
        res.json(movies);
    });
});
router.get('/imdb', function (req, res) {
    request({
        method: 'GET',
        uri: 'http://sg.media-imdb.com/suggests/a/aliens.json',
    }, function (err, response, body) {
        console.log(body);
    })
});
router.post('/', function (req, res)
{
    if (req.body.Id && req.body.Title && req.body.Director && req.body.Year && req.body.Rating)
    {
        json.push(req.body);
        res.json(json);
    }
    else
    {
        res.json(500, { error: 'There was an error!' });
    }
});
router.put('/:id', function (req, res)
{
    _.each(movies, function (elem, index)
    {
        if (elem.Id === req.params.id)
        {
            elem.Title = req.body.Title || "No title";
            elem.Director = req.body.Director || "None";
            elem.Year = req.body.Year || 1999;
            elem.Rating = req.body.Rating || 0;
        }
    });
    res.json(movies);
});
router.delete('/:id', function (req, res)
{
    var indexToDel = -1;
    _.each(json, function (elem, index) {
        if (elem.Id === req.params.id) {
            indexToDel = index;
        }
    });
    if (~indexToDel) {
        movies.splice(indexToDel, 1);
    }
    res.json(movies);

});

app.use('/', router);
var server = app.listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));
});

