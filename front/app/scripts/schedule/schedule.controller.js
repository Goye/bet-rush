(function() {
  angular
    .module('prodigi.schedule')
    .controller('ScheduleCtrl', ScheduleCtrl);

  function ScheduleCtrl($scope, $timeout, ScheduleFactory, ngDialog, ResourceFactory) {
    var vm = this;
    vm.event = ScheduleFactory;

    vm.data = {
      _id: 0
    };

    vm.schedule = [];

    var activityEvent = {
      dia: '',
      events: []
    };

    //Modal
    $scope.showModal = function(data, day) {
      ngDialog.open({
        template: '/views/schedule.popup.view.html',
        className: 'ngdialog-theme-default ngdialog-small',
        showClose: false,
        controller: ['$scope', function($scope) {
          $scope.data = data;
          $scope.day = day;
        }]
      });
    };

    //====================================
    // Slick 3
    //====================================
    $scope.schedule = [
      {
        dia: 'abril 9',
        events: [{
          category: 'talk',
          name: 'Introducción a Javascript',
          schedule: '10:00 a 11:15',
          totalCapacity: '20',
          objective: 'Dar a conocer qué es Javascript y las posibilidades que aporta al Front-End',
          body: 'Javascript es el lenguaje de programación que da vida a las aplicaciones del lado de cliente. Además, es uno de los lenguajes mas usados en el momento, y una de las 3 tecnologías que DEBES aprender si quieres dedicarte al Front End.',
          host: 'Luis Villalba'
        },{
          category: 'talk',
          name: 'Básico de html y CSS',
          schedule: '10:00 a 11:15',
          totalCapacity: '20',
          objective: 'Introducir conceptos basicos de HTML y CSS',
          body: 'Workshop donde los participantes costruiran un landing page aplicando co conceptos basicos de HTML & CSS',
          host: 'Claudia Heredia'
        },{
          category: 'workshop',
          name: 'Qué buscan los reclutadores técnicos de Front End',
          schedule: '11:30 a 13:00',
          totalCapacity: '20',
          objective: 'Explicar las necesiades tecnicas que se buscan el mercado de Front End',
          body: 'Dada la tendencia de separar las capas de las aplicaciones web, se ha abierto un mercado a un nuevo tipo de ingeniería del lado del cliente, en esta charla aprenderemos qué tipo de perfiles son los que buscan los reclutadores y que conocimientos base se deben tener a la hora de presentarse a una vacante.',
          host: 'Ivan Amortegui'
        },{
          category: 'talk',
          name: 'Herramientas de Trabajo',
          schedule: '11:30 a 13:00',
          totalCapacity: '20',
          objective: 'Mostrar que herramientas usamos y porque lo hacemos, ser frontend no es solo conocimiento de programación.',
          body: 'Mostrar las herramientas más utilizadas para trabajar como Frontend (Photoshop, herramientas de prototipado, addons)',
          host: ' Link Strifer / Gabriel Garnica'
        },
        {
          category: 'talk',
          name: 'Animación CSS',
          schedule: '11:30 a 13:00',
          totalCapacity: '10',
          objective: 'Aplicar los conceptos básicos de animación con CSS en un taller práctico',
          body: 'Teniendo en cuenta conceptos de animación básicos como la sincronización, el tiempo y la exageración, crear una animación haciendo uso de CSS para renderizar en un navegador una animación básica. A cada participante se le entregaran los assets necesarios para el desarrollo taller.',
          host: 'Carlos Avila / Gabriel Garnica'
        },
        {
          category: 'talk',
          name: 'Programación en Pseudocódigo',
          schedule: '11:30 a 13:00',
          totalCapacity: '20',
          objective: 'El propósito de este taller es dar una introducción básica de lógica de programación a cualquier persona interesada en el desarrollo de cualquier aplicación de software.',
          body: 'El taller de programación en pseudocódigo es un taller que está destinado a cualquier persona que esté interesada en el desarrollo de software. En éste se enseñarán las distintas estructuras de control requeridas para poder construir un algoritmo.',
          host: 'Bh / Luis Villalba'
        },
        {
          category: 'workshop',
          name: 'Automatización',
          schedule: '14:00 a 14:45',
          totalCapacity: '20',
          objective: 'Demostrar cuan fáciles pueden ser las tareas repetitivas (y a la larga tediosas) cuando se sabe programar.',
          body: 'Una serie de demostraciones prácticas de la importancia de la automatización para optimizar todos los procesos.',
          host: 'Ivan Amortegui / Nicolás Arteaga / Bh'
        },
        {
          category: 'workshop',
          name: 'Design UX',
          schedule: '14:00 a 14:45',
          totalCapacity: '14',
          objective: '',
          body: '',
          host: 'Julio Gomez'
        },
        {
          category: 'talk',
          name: 'Trabajando QA',
          schedule: '14:00 a 14:45',
          totalCapacity: '20',
          objective: 'Presentar una visión integral de la Experiencia de Usuario enfocada a la navegación multiplataforma tomando el Responsive Web Design como guía de referencia del diseño web en la actualidad.',
          body: 'Debido a la cantidad de dispositivos en el mercado, la web necesita diferentes formas de mostrarse, sabemos que los usuarios de distintas plataformas se sienten más cómodos utilizando ciertos tipos de interacciones, el responsive design responde a todos estos tipos de requerimientos sin la necesidad de establecer aplicaciones distintas para un mismo propósito.',
          host: 'Ana Arbelaez / Nicolás Arteaga/ María Antonia'
        },
        {
          category: 'talk',
          name: 'Frameworks',
          schedule: '14:00 a 14:45',
          totalCapacity: '10',
          objective: 'Conocer e identificar los diferentes framework de Javascript que se manejan actualmente, distinguir frameworks y librerías.',
          body: 'Por medio de este taller se podrá identificar y utilizar algunos de los frameworks que se manejan actualmente, aclarar dudas e inquietudes.'+
          'Por qué vale la pena utilizar un framework.'+
          'Cual es la diferencia de usar un framework de Javascript Vanilla.'+
          'Cómo escoger el mejor framework para un proyecto.',
          host: 'Carlos Mercado'
        },
        {
          category: 'workshop',
          name: 'Design UI',
          schedule: '15:00 a 15:45',
          totalCapacity: '20',
          objective: '',
          body: '',
          host: 'Julio Gomez'
        },
        {
          category: 'workshop',
          name: 'Evolution Fron End',
          schedule: '15:00 a 15:45',
          totalCapacity: '14',
          objective: 'Mostrar la evolucion de las herramientas utilizadas para crear frontend.',
          body: ' Desde HTML hasta la frameworizacion XD.',
          host: 'Gabriel Garnica'
        },
        {
          category: 'talk',
          name: 'Make it real',
          schedule: '15:00 a 15:45',
          totalCapacity: '20',
          objective: '',
          body: '',
          host: ''
        },
        {
          category: 'workshop',
          name: 'IGNITES',
          schedule: '16:00 a 16:45',
          totalCapacity: '20',
          objective: 'Para entender que hacemos hay que entender de donde viene la carrera y porque existe + extra de tips para ayudarles a conseguir empeo en el desarrollo de software',
          body: 'Pequeñas charlas explicando temas de interés para una persona que desea ingresar en el mundo del Frontend. 5 charlas de 7 minutos con 3 minutos de preguntas. Ignites propuestos: Que es el frontend? Evolución del front end, Hello world en 7 minutos de algún framework, Por que ser un frontend, Tips para conseguir trabajo. ',
          host: 'Oscar Mendez / Bh / César Moreno / Luis Villalba'
        }]
      },
      {
        dia: 'abril 10',
        events: [{
          category: 'talk',
          name: 'Teletrabajo',
          schedule: '9:00 a 9:15',
          totalCapacity: '20',
          objective: 'Establecer claridades sobre las dinamicas de Teletrabajo en la empresa',
          body: 'Que es el teletrabajo, Como funciona y como se aplica dentro de Prodigious ',
          host: 'HR TEAM (Andrea y Natalia)'
        },{
          category: 'talk',
          name: 'Animación CSS',
          schedule: '9:30 a 10:15',
          totalCapacity: '20',
          objective: 'Aplicar los conceptos básicos de animación con CSS en un taller práctico',
          body: 'Teniendo en cuenta conceptos de animación básicos como la sincronización, el tiempo y la exageración, crear una animación haciendo uso de CSS para renderizar en un navegador una animación básica. A cada participante se le entregaran los assets necesarios para el desarrollo taller.',
          host: 'Carlos Avila / Gabriel Garnica'
        },
        {
          category: 'talk',
          name: 'Canvas',
          schedule: '9:30 a 10:15',
          totalCapacity: '20',
          objective: 'Introduccion sobre que es canvas, como funciona, las ventajas y desventajas de usar canvas',
          body: 'Realizar una charla en donde se empezara por cnoceptos basicos sobre que es Canvas, ventajas y desventajas, seguido de un ejemplo basico y finalizando con algunas muestras de paginas que implementan Canvas de manera mas compleja. ',
          host: 'Oscar Mendez'
        },
        {
          category: 'workshop',
          name: 'Design UX',
          schedule: '10:30 a 11:15',
          totalCapacity: '20',
          objective: '',
          body: '',
          host: 'Julio Gomez'
        },
        {
          category: 'talk',
          name: 'Design UI',
          schedule: '10:30 a 11:15',
          totalCapacity: '20',
          objective: '',
          body: '',
          host: 'Julio Gomez'
        },
        {
          category: 'talk',
          name: 'Responsive Design',
          schedule: '10:30 a 11:15',
          totalCapacity: '20',
          objective: 'Conocer los aspectos básicos del manejo de diseño responsivo',
          body: 'En este workshop los asistentes conocerán qué es un diseño responsivo y cómo generarlo',
          host: ' Ana Arbelaez / Maria Antonia Serna'
        }]
      }
    ];


    vm.startConfig = function(){
      $scope.slickConfigLoaded = true;
      $scope.slickConfig = {
        method: {},
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        easing: 'swing',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              infinite: true
            }
          },
          {
            breakpoint: 768
          }
        ]
      };
    }

  }
}());
