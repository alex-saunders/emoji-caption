# emoji-caption

Automatically generated emoji captions for your images

![preview](https://user-images.githubusercontent.com/22820481/34322610-c468417e-e823-11e7-9e6c-8be272450496.png)

Emoji caption automatically generates captions for your images and provides an emoji translation!

Image captions are created with the [Microsoft Azure computer vision API](https://azure.microsoft.com/en-gb/services/cognitive-services/computer-vision/), emojis are generated with use of the [emojilib library](https://github.com/muan/emojilib) and the UI is implemented with Polymer.

## Running the site locally

1. Clone the repo
2. `cd emoji-caption`
3. `npm i`
4. `bower i`

### Setting up credentials

In order to run the site locally you will need to have an account set up with Azure and an active subscription to the computer vision API. Once you have done this you'll need to edit `credentials.js`, into which you will need to update the `region` and `subscriptionKey` values to your corresponding API keys.

Afterwards, you'll be able to run `npm run dev` to set up a development environment or `npm start` to run a build.

Finally, navigate to [localhost:9000](https://localhost:5000).

## License

The MIT License © 2017 Alex Saunders. All rights reserved.