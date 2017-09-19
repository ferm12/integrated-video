jQuery(document).ready(function($) {    

        // Todo - get this working through Modernizr
        jQuery('input').placeholder();
        
        $('input[name=email_as_id]').change(function(eventObj) {
            if(!eventObj.target.checked) {
                // show account id box
                $('#account_id_container').slideDown('fast');
            } else {
                // hide account id box (also clear out value and validation msgs)
                $('#account_id_container').slideUp('fast');
                $('input[name=account_id]').val('');
                removeFieldValidationClasses('account_id');
            }
        });

        // Setup click event to close/hide error notice
        $('#create_account_error_notice a.close').click(function(eventObj) {
            $(this).parent().hide();
        });

        var accountValidationConfig = {
            password: {
                name: 'password',
                display: 'Password',
                rules: 'required|min_length[6]|max_length[255]|alpha_dash|valid_oxygen_password'
            },
            account_id: {
                name: 'account_id',
                display: 'Account ID',
                rules: 'optional|alpha_dash|min_length[6]|max_length[256]'
            },
            email_address: {
                name: 'email_address',
                display: 'Email',
                rules: 'required|valid_email|max_length[256]'
            }
        };

        function confirmField(fieldName) {                      
            $('input[name="'+fieldName+'"]').parent().removeClass('warning error').addClass('success');
            $('input[name="'+fieldName+'"]').next('span.help-inline').html('').hide();        
        }
        
        function errorField(fieldName, errorMsg) {
            $('input[name="'+fieldName+'"]').parent().removeClass('warning success').addClass('error');
            $('input[name="'+fieldName+'"]').next('span.help-inline').html(errorMsg).show();
        }
             
        function removeFieldValidationClasses(fieldName) {
            $('input[name="'+fieldName+'"]').parent().removeClass('error warning success');
            $('input[name="'+fieldName+'"]').next('span.help-inline').hide().html('');
        }        

        function warnField(fieldName, warnMsg) {
            $('input[name="'+fieldName+'"]').parent().removeClass('error success').addClass('warning');
            $('input[name="'+fieldName+'"]').next('span.help-inline').html(warnMsg).show();
        }   

        /* Called when a field gains or loses focus */
        function validateField(eventObj) {
            var me = this;
            
            var fieldConfig = (accountValidationConfig[eventObj.target.name] ? accountValidationConfig[eventObj.target.name] : null);
            var formValidator = new FormValidator();
                    
            if(fieldConfig !== null) {
                fieldConfig.value = eventObj.target.value;
                
                formValidator.validateField(fieldConfig);
                
                if(eventObj.type === 'keyup' && formValidator.errors.length > 0) {
                    warnField(eventObj.target.name, formValidator.errors[0]);
                } else if((eventObj.type === 'focusout' || eventObj.type === 'change') && (formValidator.errors.length > 0)) {
                    errorField(eventObj.target.name, formValidator.errors[0]);
                } else {
                    confirmField(eventObj.target.name);
                }
                
            } else {
                me.confirmField(eventObj.target.name);
            }
            
            delete formValidator;
            delete fieldConfig;
        }

        /* Called when submit button triggers */
        function validateFields(eventObj) {
            var form = $('#create_grid_form');
            var keyVals = form.serializeArray();
            var formValidator = new FormValidator();
            
            $.each(keyVals, function(indexInArray, keyVal) {
                var fieldConfig = (accountValidationConfig[keyVal.name] ? accountValidationConfig[keyVal.name] : null);

                if(fieldConfig !== null) {            
                    fieldConfig.value = keyVal.value;
                    formValidator.validateField(fieldConfig, eventObj);
                }
            });

            return formValidator;
        }

        function submitCreateAccount(eventObj) {
            var validationResults = validateFields(eventObj);
            var form = $('#create_grid_form');
            var inputs = $('#create_grid_form :input');
            var pw = inputs[1]['value'];
            
            // Double check all fields are validated            
            if(validationResults.errors.length === 0 && !$(eventObj.target).hasClass('disabled')) {
                var keyVals = form.serializeArray();
                _gaq.push(['_trackPageview', '/create-account']); // Google Analytics tracking
                   
                // Disable form fields to indicate request is being processed
                $('div.create-account-alert').hide();
                inputs.attr('disabled', true);
                $(eventObj.target).removeClass('button-signup').addClass('button-connecting').addClass('disabled').attr('disabled', 'disabled');
                
                $.ajax({
                    data: keyVals,
                    complete: function(jqXHR, textStatus) {
                        inputs.attr('disabled', false);
                        $(eventObj.target).removeClass('button-connecting').addClass('button-signup').removeClass('disabled').attr('disabled', false);
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        var responseData = $.parseJSON(jqXHR.responseText);
                        //alert('error='+responseData);
                        var errorMsg;
                        try { errorMsg = responseData.msg; } catch(e) {}
                        errorMsg = errorMsg || 'An error has occurred';

                        $('div.create-account-alert').show().find('strong').html(errorMsg);
                        _gaq.push(['_trackPageview', '/create-account-error']);
                        _gaq.push(['_trackEvent', 'Accounts', 'signup error', 'O2 Homepage - ' + errorMsg]);

                    },
                    success: function(data, textStatus, jqXHR) {
                        //DEBUG
                        //console.log('login URL: ' + data.redirectURL);
                        //DEBUG
                        window.location.href = data.redirectURL;
                        //alert('success='+data.redirectURL);
                        
                        _gaq.push(['_trackPageview', '/create-account-success']);
                        _gaq.push(['_trackEvent', 'Accounts', 'new signup', 'O2 Homepage']);
                    },
                    timeout: 20000,
                    type: 'POST',
                    url: '/account'  //https://localhost:8443/account'
                });
                
            } else {
                //DEBUG
                //console.log('invalid inputs or submit button is disabled');
                //DEBUG
            }
        }        

        // Trigger validation on focus and keyup
        $('#create_grid_form input').on({keyup: validateField, focusout: validateField});        

        $('#btn_create_grid').click(function(eventObj) {
            submitCreateAccount(eventObj);
            eventObj.preventDefault();
            eventObj.returnValue = false;
            return false;
        });
    });