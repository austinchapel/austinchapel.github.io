## setup

### to build/develop

1. [Install Ruby Gems](http://guides.rubygems.org/rubygems-basics/) if you don't already have it

2. Install Jekyll

    gem install jekyll

3. Code

    jekyll serve

Visit http://localhost:3000 . Save files and refresh to update.

### to deploy

1. [Install Node.js](https://nodejs.org/en/download/) which comes with  NPM

2. Install the [Firebase CLI](https://www.npmjs.com/package/firebase-tools):

    npm install -g firebase-tools

3. Deploy

    # clean
    rm -rf _site

    # build
    jekyll build

    # deploy
    firebase deploy

Make sure to commit/push changes!

## colophon

- https://www.lightstock.com/search?q=sam+ramsey
- http://subtlepatterns.com/concrete-seamless/
- https://www.google.com/fonts/specimen/Rock+Salt
- https://www.google.com/fonts/specimen/Contrail+One
- https://www.google.com/fonts/specimen/Antic+Slab

## licenses and copyright

- Written content is [Creative Commons Attribution 4.0 International License][cc]
- Photography is &copy; [Samuel Ramsey][]
- Code is [MIT licensed][license]

[cc]: http://creativecommons.org/licenses/by/4.0/
[Samuel Ramsey]: http://www.lanterncreative.co
[license]: https://github.com/austinchapel/austinchapel.github.io/blob/master/LICENSE
