<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
        <meta charset="utf-8" />
        <title>Controway Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Elnakieb theme" name="description" />
        <meta content="Elnakieb theme" name="author" />
        <!-- App favicon -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="shortcut icon" href="{{asset('assets/images/favicon.ico')}}">
        <!-- Scripts -->
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <!-- Bootstrap Css -->
        <link href="{{asset('assets/css/bootstrap.min.css')}}" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="{{asset('assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="{{asset('assets/css/app.min.css')}}" id="app-style" rel="stylesheet" type="text/css" />
</head>
<body class="auth-body-bg">
<script>
    var base_url = "{{ getBaseUrl() }}";
</script>
@yield('content')

<!-- App js -->
<script src="{{asset('assets/js/jquery.min.js')}}"></script>

</body>
</html>
