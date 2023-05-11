# Teacher Guide

- [Introduction](#introduction)
- [Installation](#installation)
- [Configuration](#configuration)

## Introduction

This is a user guide for the Laravel package `laravel-apidoc-generator` which is a package to generate API documentation from your Laravel code.

## Installation

You can install the package via composer:

```bash
composer require mpociot/laravel-apidoc-generator --dev
```

## Configuration

You can publish the config file with:

```bash
php artisan vendor:publish --provider="Mpociot\ApiDoc\ApiDocGeneratorServiceProvider" --tag=apidoc-config
```

This is the contents of the published config file

![Shrek](http://localhost:8000/docs/shrek.png)

If you dont see the image run: `php artisan storage:link`

[Shrek](http://localhost:8000/docs/shrek.png)

- hello
- world
- foo
