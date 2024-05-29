# visioncraft-playground

Мне нужно создать сайт в темной теме, с зелёными оттенками, в котором можно генерировать изображения с помощью Stable Diffusion. Название "VisionCraft Playground". У меня есть АПИ от Stable Diffusion, всё доступные модели sd можно получить списком при get запросе вот так: 

curl -X 'GET' \
  'https://visioncraft.top/sd/models-sd' \
  -H 'accept: application/json'

В ответ получаешь список всех доступных моделей sd. Список всех доступных моделей SDXL можно получить так:

curl -X 'GET' \
  'https://visioncraft.top/sd/models-sdxl' \
  -H 'accept: application/json'

Но там огромное количество моделей sd и sdxl более трёх тысяч. Нужно, чтобы пользователь не запутался и чтобы всё выглядело максимально красиво и эстетично.

Генерировать изображения нужно так:

curl -X 'POST' \
  'https://visioncraft.top/sd' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "token": "string",
  "model": "string",
  "prompt": "string",
  "negative_prompt": "Ugly, Disfigured, Deformed, Low quality, Pixelated, Blurry, Grains, Text, Watermark, Signature, Out of frame, Disproportioned, Bad proportions, Gross proportions, Bad anatomy, Duplicate, Cropped, Extra hands, Extra arms, Extra legs, Extra fingers, Extra limbs, Long neck, Mutation, Mutilated, Mutated hands, Poorly drawn face, Poorly drawn hands, Missing hands, Missing arms, Missing legs, Missing fingers, Low resolution, Morbid.",
  "steps": 30,
  "width": 1024,
  "height": 1024,
  "sampler": "Euler a",
  "cfg_scale": 7
}'

Токен пользователь вводит сам на сайте. Промпт также пишет сам, но при нажатии на волшебную палочку рядом с полем для ввода промпта выбирается рандомно один из преднарисаных промптов. Чтобы пользователю не нужно было выбирать. Steps всегда пускай будет 30, для него во фронтенд ничего не нужно добавлять. Ширину и высоту выбирает пользователей из трёх предложенных, квадрат, горизонтальный и вертикальный. Также пускай будет поле расширенные настройки, где пользователь может выбрать sampler, всё доступные sampler можно получить так:

curl -X 'GET' \
  'https://visioncraft.top/sd/samplers' \
  -H 'accept: application/json'

Смотри там их тоже много, как моделей

И также в расширенных настройках пускай также можно ползунком выбрать cfg_scale, от трёх до 15.

Когда сделан запрос в апи и изображение сгенерированно, АПИ отдает байт-код изображения. Одного, так как один запрос.

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/visioncraft-playground.git
cd visioncraft-playground
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
