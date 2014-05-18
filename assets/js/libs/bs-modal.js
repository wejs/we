/*
Modal component.
*/

define('bs-modal',[
  'ember',
  'handlebars',
  'bootstrap',
  'bs-core'
], function (ember, handlebars, bootstrap) {

  Bootstrap.BsModalComponent = Ember.Component.extend({
    layoutName: 'components/bs-modal',
    classNames: ['modal'],
    attributeBindings: ['role', 'aria-labelledby', 'isAriaHidden:aria-hidden', "ariaLabelledBy:aria-labelledby"],
    isAriaHidden: (function() {
      return "" + (this.get('isVisible'));
    }).property('isVisible'),
    modalBackdrop: '<div class="modal-backdrop fade in"></div>',
    role: 'dialog',
    backdrop: true,
    title: null,
    isVisible: false,
    manual: false,
    didInsertElement: function() {
      var name;
      this._super();
      this.setupBinders();
      name = this.get('name');
      Ember.assert("Modal name is required for modal view " + (this.get('elementId')), this.get('name'));
      if (name == null) {
        name = this.get('elementId');
      }
      Bootstrap.ModalManager.add(name, this);
      if (this.manual) {
        return this.show();
      }
    },
    becameVisible: function() {
      if (this.get("backdrop")) {
        return this.appendBackdrop();
      }
    },
    becameHidden: function() {
      if (this._backdrop) {
        return this._backdrop.remove();
      }
    },
    appendBackdrop: function() {
      var parentElement;
      parentElement = this.$().parent();
      return this._backdrop = Em.$(this.modalBackdrop).appendTo(parentElement);
    },
    show: function() {
      return this.set('isVisible', true);
    },
    hide: function() {
      return this.set('isVisible', false);
    },
    toggle: function() {
      return this.toggleProperty('isVisible');
    },
    click: function(event) {
      var target, targetDismiss;
      target = event.target;
      targetDismiss = target.getAttribute("data-dismiss");
      if (targetDismiss === 'modal') {
        return this.close();
      }
    },
    keyPressed: function(event) {
      if (event.keyCode === 27) {
        return this.close(event);
      }
    },
    close: function(event) {
      if (this.get('manual')) {
        return this.destroy();
      } else {
        return this.hide();
      }
    },
    willDestroyElement: function() {
      var name;
      this.removeHandlers();
      name = this.get('name');
      if (name == null) {
        name = this.get('elementId');
      }
      Bootstrap.ModalManager.remove(name, this);
      if (this._backdrop) {
        return this._backdrop.remove();
      }
    },
    removeHandlers: function() {
      return jQuery(window.document).unbind("keyup", this._keyUpHandler);
    },
    setupBinders: function() {
      var handler,
        _this = this;
      handler = function(event) {
        return _this.keyPressed(event);
      };
      jQuery(window.document).bind("keyup", handler);
      return this._keyUpHandler = handler;
    }
  });

  /*
  Bootstrap.BsModalComponent = Bootstrap.BsModalComponent.reopenClass(
      build: (options) ->
          options = {}  unless options
          options.manual = true
          modalPane = @create(options)
          modalPane.append()
  )
  */


  Bootstrap.ModalManager = Ember.Object.create({
    add: function(name, modalView) {
      return this.set(name, modalView);
    },
    remove: function(name) {
      return this.set(name, null);
    },
    close: function(name) {
      return this.get(name).close();
    },
    hide: function(name) {
      return this.get(name).hide();
    },
    show: function(name) {
      return this.get(name).show();
    },
    toggle: function(name) {
      return this.get(name).toggle();
    },
    open: function(name, title, view, footerButtons, controller) {
      var cl, modalComponent, template;
      cl = controller.container.lookup('component-lookup:main');
      modalComponent = cl.lookupFactory('bs-modal', controller.get('container')).create();
      modalComponent.setProperties({
        name: name,
        title: title,
        manual: true,
        footerButtons: footerButtons,
        targetObject: controller
      });
      if (Ember.typeOf(view) === 'string') {
        template = controller.container.lookup("template:" + view);
        Ember.assert("Template " + view + " was specified for Modal but template could not be found.", template);
        if (template) {
          modalComponent.setProperties({
            body: Ember.View.extend({
              template: template
            })
          });
        }
      } else if (Ember.typeOf(view) === 'class') {
        modalComponent.setProperties({
          body: view,
          controller: controller
        });
      }
      return modalComponent.appendTo(controller.namespace.rootElement);
    }
  });

  Ember.Application.initializer({
    name: 'bs-modal',
    initialize: function(container, application) {
      return container.register('component:bs-modal', Bootstrap.BsModalComponent);
    }
  });


});