document.addEventListener("DOMContentLoaded", function() {
  $.ajaxSetup({
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')}
  });

  $('#login').click(function() {
    var formData = new FormData();
    formData.append("email", $('#loginemail').val());
    formData.append("password", $('#loginpassword').val());

    $.ajax({
      type: 'post',
      url: '/api/login',
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      statusCode: {
        204: function() {
          window.location.replace('/admin/dashboard/default');
        },
        401: function() {
          var notyf = new Notyf();
          notyf.error('User not found, please try again');
        }
      }
    });
  });

  $('#logout').click(function(){
    $.ajax({
      type: 'get',
      url: '/api/logout',
      statusCode: {
        204: function() {
          window.location.replace('/login');
        },
      }
    });
  });

  if(window.location.pathname === "/admin/transporter/add" || window.location.pathname === "/admin/transporter/edit") {
    $('.selectcity').each(function() {
      $(this).multiselect({
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200,
        buttonWidth: '100%',
      });
    });

    $('#isbranch').multiselect({
      enableCaseInsensitiveFiltering: true,
      maxHeight: 200,
      buttonWidth: '100%',
    });
    refreshbranchselect();

    $('.truckselect').each(function() {
      $(this).multiselect({
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200,
        buttonWidth: '100%'
      });
    });
    refreshtruckselect();


    $.ajax({
      type: "get",
      url: '/api/regions',
      datatype: 'json',
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        $(".selectstate").empty();
        $(".selectstate").append("<option value='' disabled selected>Select State</option>");
        $.each(data, function(index, element){
          $(".selectstate").append("<option value='"+element.id+"'>"+element.state+"</option>");
        });
      }
    });
  }

  $(".selectstate").change(function() {
    id=$(this).attr('id');
    $.ajax({
      type: "get",
      url: '/api/regions/'+$("#"+id).val(),
      datatype: 'json',
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        $("#"+id.replace('state', '')).empty();
        $.each(data, function(index, element){
          $("#"+id.replace('state', '')).append("<option value='"+element.id+"'>"+element.city+"</option>");
        });
        $("#"+id.replace('state', '')).multiselect('rebuild');
      }
    });
  });

  if(window.location.pathname === "/admin/transporter/view") {
    id=(window.location.href).split('?')[1];
    $.ajax({
      type: "get",
      url: '/api/transporters/'+id,
      success: function(data) {
        $("#viewbusinessname").append(data.businessname);
        $("#viewownername").append(data.ownername);
        $("#viewtype").append(data.type);
        $("#viewwhatsappnumber").append(data.whatsappnumber);
        $("#viewemailaddress").append(data.email);
        $("#viewreferrername").append(data.referrername);
        $("#viewreferrermobile").append(data.referrermobile);

        $('#edittransporteranchor').attr("href", "/admin/transporter/edit?"+id);
      }
    }).then(function(response){
      $.ajax({
        type: "get",
        url: '/api/contacts/'+response.id,
        success: function(data) {
          $.each(data, function() {
            appendText = "";
            appendText += "<div class='card-body col-md-4'><ul class='list-unstyled mb-0'>"
            if(data.name) {
              appendText += "<li class='mb-1'>Name <a href='#'>"+data.name+"</a></li>";
              appendText += data.whatsappnumber ? "<li class='mb-1'>What's App Number <a href='#'>"+data.whatsappnumber+"</a></li>" : "";
              appendText += data.mobile ? "<li class='mb-1'>Contact Number <a href='#'>"+data.mobile+"</a></li>" : "";
              appendText += data.mobile2 ? "<li class='mb-1'>Alternate Contact <a href='#'>"+data.mobile2+"</a></li>" : "";
            }
            appendText += "</ul></div>"
            $('#viewmorecontacts').append(appendText);
          });
        }
      })
      $.ajax({
        type: "get",
        url: '/api/regions/view/'+response.region,
        success: function(data) {
          $("#viewaddress").append(response.address+" ,"+data.state+", "+data.city+" ,"+response.area+".");
        }
      })
      $.ajax({
        type: "post",
        url: '/api/documents/'+visitingcard,
        data: formData,
        datatype: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
        $("#"+id+"carouselinner").empty();
        $("#"+id+"id").val("");
        $.each(data, function(index,element) {
          if ( $('#'+id+"carouselinner").children().length > 0 ) {
            $('#'+id+"carouselinner").append("<div class='carousel-item'><img class='img-responsive' width='600' height='300' src='/storage/"+element.path+"'>");
          } else {
            $('#'+id+"carouselinner").append("<div class='carousel-item active'><img class='img-responsive' width='600' height='300' src='/storage/"+element.path+"'>");
          }
          $('#'+id+"id").val($('#'+id+"id").val() !== "" ? $('#'+id+"id").val() + ";" + element.id : $('#'+id+"id").val() + element.id);
        });

        }
      })
    });
  }

  $(".instantview").on('change', function(){
    id=$(this).attr('id');

    var formData = new FormData();
    var ins = $("#"+id)[0].files.length;
    for (var x = 0; x < ins; x++) {
      formData.append("path[]", $("#"+id)[0].files[x]);
    }

    $.ajax({
      type: "post",
      url: '/api/documents',
      data: formData,
      datatype: 'json',
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        $("#"+id+"carouselinner").empty();
        $("#"+id+"id").val("");
        $.each(data, function(index,element) {
          if ( $('#'+id+"carouselinner").children().length > 0 ) {
            $('#'+id+"carouselinner").append("<div class='carousel-item'><img class='img-responsive' width='600' height='300' src='/storage/"+element.path+"'>");
          } else {
            $('#'+id+"carouselinner").append("<div class='carousel-item active'><img class='img-responsive' width='600' height='300' src='/storage/"+element.path+"'>");
          }
          $('#'+id+"id").val($('#'+id+"id").val() !== "" ? $('#'+id+"id").val() + ";" + element.id : $('#'+id+"id").val() + element.id);
        });
      }
    });
  });

  $(".instantsave").on('change', function(){
    id=$(this).attr('id');

    var formData = new FormData();
    var ins = $("#"+id)[0].files.length;
    for (var x = 0; x < ins; x++) {
      formData.append("path[]", $("#"+id)[0].files[x]);
    }

    $.ajax({
      type: "post",
      url: '/api/documents',
      data: formData,
      datatype: 'json',
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        $("#"+id+"id").val("");
        $.each(data, function(index,element) {
          $('#'+id+"id").val($('#'+id+"id").val() !== "" ? $('#'+id+"id").val() + ";" + element.id : $('#'+id+"id").val() + element.id);
        });
      }
    });
  });

  $("#addtransporterwizard").smartWizard({
    theme: "default",
    cycleSteps: true,
    autoAdjustHeight: false,
    toolbarSettings: {
      toolbarPosition: 'none',
    },
    anchorSettings: {
      anchorClickable: true,
      enableAllAnchors: true
    },
  });

  function edittransporterdatafill() {
    setCity = [];
    id=(window.location.href).split('?')[1];

    $.ajax({
      type: "get",
      url: '/api/transporters/'+id,
      success: function(data) {
        $("#transporterid").val(data.id);
        $("#basiccitystate").val(getState(getState(data.region)));
        setCity.push({id: 'basiccitystate', code: data.region})
        $("#isbranch").multiselect("deselect", $("#isbranch").val());
        $("#isbranch").multiselect("select", data.branch);
        $("#basicarea").val(data.area);
        $("#transportertype").val(data.type);
        $("#ratings").val(data.ratings);
        $("#transportername").val(data.businessname);
        $("#ownername").val(data.ownername);
        $("#transporteraadhar").val(data.aadhar);
        $("#transporterpan").val(data.pan);
        $("#transportergst").val(data.gst);
        $("#address").val(data.address);
        $("#whatsappmobile").val(data.whatsappnumber);
        $("#emailaddress").val(data.email);
        $("#referrername").val(data.referrername);
        $("#referrermobile").val(data.referrermobile);
      }
    }).then(function(response){
      $.ajax({
        type: "post",
        url: '/api/documents/multiple',
        data: {documents: response.visitingcard.split(';')},
        success: function(data) {
          $("#visitingcardcarouselinner").empty();
          $.each(data, function(index,element) {
            if ( $("#visitingcardcarouselinner").children().length > 0 ) {
              $("#visitingcardcarouselinner").append("<div class='carousel-item'><img class='img-responsive' width='600' height='300' src='/storage/"+element.path+"'>");
            } else {
              $("#visitingcardcarouselinner").append("<div class='carousel-item active'><img class='img-responsive' width='600' height='300' src='/storage/"+element.path+"'>");
            }
          });
          $("#visitingcardid").val(response.visitingcard);
        }
      });
      $.ajax({
        type: "get",
        url: '/api/contacts/'+response.id,
        success: function(data) {
          for ( i = 1; i <= Object.keys(data).length; i++) {
            $('#multiplename'+i).val(data[i -1].name);
            $('#multiplecontact1'+i).val(data[i - 1].mobile);
            $('#multiplecontact2'+i).val(data[i - 1].mobile2);
            $('#multiplewhatsappmobile'+i).val(data[i - 1].whatsappnumber);
          }
        }
      });
      $.ajax({
        type: "get",
        url: '/api/banks/'+response.id,
        success: function(data) {
          for ( i = 1; i <= Object.keys(data).length; i++) {
            $("#bankholdername"+i).val(data[i - 1].holdername);
            $("#accountnumber"+i).val(data[i - 1].accountnumber);
            $("#bankname"+i).val(data[i - 1].name);
            $("#bankbranch"+i).val(data[i - 1].branch);
            $("#ifsccode"+i).val(data[i - 1].ifsccode);
          }
        }
      });
      $.ajax({
        type: "get",
        url: '/api/services/'+response.id,
        success: function(data) {
          for ( i = 1; i <= Object.keys(data).length; i++) {
            fromServiceCityArray = data[i - 1].fromregion.split(';');
            $("#fromservicecitystate"+i).val(getState(fromServiceCityArray[0]));
            setCity.push({id: 'fromservicecitystate'+i, code: fromServiceCityArray})

            toServiceCityArray = data[i - 1].toregion.split(';');
            $("#toservicecitystate"+i).val(getState(toServiceCityArray[0]));
            setCity.push({id: 'toservicecitystate'+i, code: toServiceCityArray})

            truckSelect = data[i - 1].truck.split(';');
            $("#truckselect"+i).multiselect('select', truckSelect);
            $("#commodities"+i).val(data[i - 1].commodity);
          }
        }
      });
    });
    setCities(setCity);
  }

  function setCities(cityArray) {
    setTimeout(function() {
      $.each(cityArray, function(index, element){
        $.ajax({
          type: "get",
          url: '/api/regions/'+$("#"+element.id).val(),
          success: function(data) {
            $("#"+element.id.replace('state', '')).empty();
            $.each(data, function(index, innerelement){
              $("#"+element.id.replace('state', '')).append("<option value='"+innerelement.id+"'>"+innerelement.city+"</option>");
            });
            $("#"+element.id.replace('state', '')).multiselect('rebuild');
            $("#"+element.id.replace('state', '')).multiselect("deselect", $("#"+element.id.replace('state', '')).val());
            $("#"+element.id.replace('state', '')).multiselect("select", element.code);
          }
        });
      });
    },1000);
  }

  if(window.location.pathname === "/admin/transporter/edit") {
    edittransporterdatafill();
  }

  $("#edittransportertodatabase").click(function() {
    event.preventDefault();

    if(!transportervalidation()) {
      return false;
    }

    var formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("businessname", $("#transportername").val());
    formData.append("ownername", $("#ownername").val());
    formData.append("type", $("#transportertype").val());
    formData.append("ratings", $("#ratings").val());
    formData.append("email", $("#emailaddress").val());
    formData.append("whatsappnumber", $("#whatsappmobile").val());
    formData.append("aadhar", $("#transporteraadhar").val());
    formData.append("pan", $("#transporterpan").val());
    formData.append("gst", $("#transportergst").val());
    formData.append("address", $("#address").val());
    formData.append("region", $("#basiccity").val());
    formData.append("area", $("#basicarea").val());
    formData.append("branch", $("#isbranch").val());
    formData.append("referrername", $("#referrername").val());
    formData.append("referrermobile", $("#referrermobile").val());
    formData.append("visitingcard", $("#visitingcardid").val());
    formData.append("documents", $("#documentsid").val());

    var notyf = new Notyf();

    $.ajax({
      type: "post",
      url: '/api/transporters/'+$("#transporterid").val(),
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        window.location.replace("/admin/transporter/view?"+data.id);
        notyf.success('Your changes have been successfully saved!');
      },
      error: function() {
        notyf.error('Error occured!! Your change is not saved.');
      }
    }).then(function(response){
      deleteContacts(response.id);
      for(i=1; i<=5;i++){
        if($('#multiplename'+i).val() !== "") {
          var formData = new FormData();
          formData.append("transporter", response.id);
          formData.append("name", $('#multiplename'+i).val());
          formData.append("mobile", $('#multiplecontact1'+i).val());
          formData.append("mobile2", $('#multiplecontact2'+i).val());
          formData.append("whatsappnumber", $('#multiplewhatsappmobile'+i).val());
          $.ajax({
            type: "post",
            url: '/api/contacts',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
          })
        }
      }
      deleteBanks(response.id);
      for(i=1; i<=5;i++){
        if($('#accountnumber'+i).val() !== "") {
          var formData = new FormData();
          formData.append("transporter", response.id);
          formData.append("holdername", $("#bankholdername"+i).val());
          formData.append("accountnumber", $("#accountnumber"+i).val());
          formData.append("name", $("#bankname"+i).val());
          formData.append("branch", $("#bankbranch"+i).val());
          formData.append("ifsccode", $("#ifsccode"+i).val());
          $.ajax({
            type: "post",
            url: '/api/banks',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
          })
        }
      }
      deleteServices(response.id);
      for(i=1; i<=5;i++){
        if($('#fromservicecitystate'+i).val() !== null) {
          fromString = "";
          for(k=0;k < $('#fromservicecity'+i).val().length; k++) {
            fromString += fromString === "" ? $('#fromservicecity'+i).val()[k] : ";"+$('#fromservicecity'+i).val()[k];
          }
          toString = "";
          for(j=0;j < $('#toservicecity'+i).val().length; j++) {
            toString += toString === "" ? $('#toservicecity'+i).val()[j] : ";"+$('#toservicecity'+i).val()[j];
          }
          truckString = "";
          for(l=0;l < $('#truckselect'+i).val().length; l++) {
            truckString += truckString === "" ? $('#truckselect'+i).val()[l] : ";"+$('#truckselect'+i).val()[l];
          }

          var formData = new FormData();
          formData.append("transporter", response.id);
          formData.append("fromregion", fromString);
          formData.append("toregion", toString);
          formData.append("truck", truckString);
          formData.append("commodity", $("#commodities"+i).val());
          $.ajax({
            type: "post",
            url: '/api/services',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
          })
        }
      }
    });
  });

  $("#addtransportertodatabase").click(function() {
    event.preventDefault();

    if(!transportervalidation()) {
      return false;
    }

    var formData = new FormData();
    formData.append("businessname", $("#transportername").val());
    formData.append("ownername", $("#ownername").val());
    formData.append("type", $("#transportertype").val());
    formData.append("ratings", $("#ratings").val());
    formData.append("email", $("#emailaddress").val());
    formData.append("whatsappnumber", $("#whatsappmobile").val());
    formData.append("aadhar", $("#transporteraadhar").val());
    formData.append("pan", $("#transporterpan").val());
    formData.append("gst", $("#transportergst").val());
    formData.append("address", $("#address").val());
    formData.append("region", $("#basiccity").val());
    formData.append("area", $("#basicarea").val());
    formData.append("branch", $("#isbranch").val());
    formData.append("referrername", $("#referrername").val());
    formData.append("referrermobile", $("#referrermobile").val());
    formData.append("visitingcard", $("#visitingcardid").val());
    formData.append("documents", $("#documentsid").val());

    var notyf = new Notyf();

    $.ajax({
      type: "post",
      url: '/api/transporters',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        window.location.replace("/admin/transporter/view?"+data.id);
        notyf.success('Your changes have been successfully saved!');
      },
      error: function() {
        notyf.error('Error occured!! Your change is not saved.');
      }
    }).then(function(response){
      deleteContacts(response.id);
      for(i=1; i<=5;i++){
        if($('#multiplename'+i).val() !== "") {
          var formData = new FormData();
          formData.append("transporter", response.id);
          formData.append("name", $('#multiplename'+i).val());
          formData.append("mobile", $('#multiplecontact1'+i).val());
          formData.append("mobile2", $('#multiplecontact2'+i).val());
          formData.append("whatsappnumber", $('#multiplewhatsappmobile'+i).val());
          $.ajax({
            type: "post",
            url: '/api/contacts',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
          })
        }
      }
      deleteBanks(response.id);
      for(i=1; i<=5;i++){
        if($('#accountnumber'+i).val() !== "") {
          var formData = new FormData();
          formData.append("transporter", response.id);
          formData.append("holdername", $("#bankholdername"+i).val());
          formData.append("accountnumber", $("#accountnumber"+i).val());
          formData.append("name", $("#bankname"+i).val());
          formData.append("branch", $("#bankbranch"+i).val());
          formData.append("ifsccode", $("#ifsccode"+i).val());
          $.ajax({
            type: "post",
            url: '/api/banks',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
          })
        }
      }
      deleteServices(response.id);
      for(i=1; i<=5;i++){
        if($('#fromservicecitystate'+i).val() !== null) {
          fromString = "";
          for(k=0;k < $('#fromservicecity'+i).val().length; k++) {
            fromString += fromString === "" ? $('#fromservicecity'+i).val()[k] : ";"+$('#fromservicecity'+i).val()[k];
          }
          toString = "";
          for(j=0;j < $('#toservicecity'+i).val().length; j++) {
            toString += toString === "" ? $('#toservicecity'+i).val()[j] : ";"+$('#toservicecity'+i).val()[j];
          }
          truckString = "";
          for(l=0;l < $('#truckselect'+i).val().length; l++) {
            truckString += truckString === "" ? $('#truckselect'+i).val()[l] : ";"+$('#truckselect'+i).val()[l];
          }

          var formData = new FormData();
          formData.append("transporter", response.id);
          formData.append("fromregion", fromString);
          formData.append("toregion", toString);
          formData.append("truck", truckString);
          formData.append("commodity", $("#commodities"+i).val());
          $.ajax({
            type: "post",
            url: '/api/services',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
          })
        }
      }
    });
  });

  $("#addtrucktodatabase").click(function() {
    event.preventDefault();

    if(!truckvalidation()) {
      return false;
    }

    var formData = new FormData();
    formData.append("type", $('#trucktype').val());
    formData.append("style", $('#truckstyle').val());
    formData.append("category", $('#truckcategory').val());
    formData.append("size", $('#trucksize').val());
    formData.append("capacity", $('#truckcapacity').val());

    var notyf = new Notyf();

    $.ajax({
      type: "post",
      url: '/api/trucks',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function() {
        $('#trucktype').val("");
        $('#truckstyle').val("");
        $('#truckcategory').val("");
        $('#trucksize').val("");
        $('#truckcapacity').val("");
        notyf.success('Your changes have been successfully saved!');
      },
      error: function() {
        notyf.error('Error occured!! Your change is not saved.');
      }
    });
    $('#truckcollapse').collapse('toggle');
  });

  $("#edittrucktodatabase").click(function() {
    event.preventDefault();

    if(!truckvalidation()) {
      return false;
    }

    var formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("type", $('#trucktype').val());
    formData.append("style", $('#truckstyle').val());
    formData.append("category", $('#truckcategory').val());
    formData.append("size", $('#trucksize').val());
    formData.append("capacity", $('#truckcapacity').val());

    var notyf = new Notyf();

    $.ajax({
      type: 'post',
      url: '/api/trucks/'+$('#truckid').val(),
      data: formData,
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      success: function() {
        notyf.success('Your changes have been successfully saved!');
      },
      error: function() {
        notyf.error('Error occured!! Your change is not saved.');
      }
    });

    $('#truckcollapse').collapse('toggle');
    $('#truckentirecard').addClass('d-none');

    refreshtrucktable();
  });

  $("#deletetruckconfirm").click(function(){
    $.ajax({
      type: "delete",
      url: '/api/trucks/'+$('#truckid').val(),
      cache: false,
      contentType: false,
      processData: false,
      success: function() {
        var notyf = new Notyf();
        notyf.success('Your truck type has been deleted successfully.');

        $('#deletetruckmodal').modal('toggle');
        $('#truckentirecard').addClass('d-none');
      }
    });
    refreshtrucktable();
  });

  window.location.pathname === "/admin/truck/index" ? refreshtrucktable() : null;
  window.location.pathname === "/admin/transporter/index" ? refreshtransportertable() : null;
});

function refreshtruckselect() {
  $.ajax({
    type: "get",
    url: '/api/trucks',
    datatype: 'json',
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      $(".truckselect").each(function() {
        id=$(this).attr('id');
        $.each(data, function(index, element){
          if($("#"+(element.type).replace(/ /g,"_")+id).length){
            $("#"+element.type+id).append("<option value='"+element.id+"'>"+element.type+"("+element.style+"), "+element.category+", "+element.size+" Feet, "+element.capacity+" Ton.</option>");
          } else{
            $("#"+id).append("<optgroup id='"+(element.type).replace(/ /g,"_")+id+"' label='"+element.type+"'><option value='"+element.id+"'>"+element.type+"("+element.style+"), "+element.category+", "+element.size+" Feet, "+element.capacity+" Ton.</option></optgroup>");
          }
        });
        $("#"+id).multiselect("rebuild");
      });
    }
  });
}

function refreshbranchselect() {
  $.ajax({
    type: "get",
    url: "/api/transporters",
    datatype: "json",
    success: function(data) {
      $("#isbranch").empty();
      $("#isbranch").append("<option value='0'>No Head Branch</option>");
      $.each(data, function( index, element ) {
        $("#isbranch").append("<option value='"+element.id+"'>"+element.businessname+"</option>");
      });
      $("#isbranch").multiselect("rebuild");
    }
  });
}

function refreshtransportertable() {
  $.ajax({
    type: "get",
    url: '/api/transporters',
    success: function(data) {
      $("#datatablestransporters").DataTable().destroy();
      $("#datatablestransporters tbody").empty();

      $.each(data, function(index, element){
        $("#datatablestransporters tbody").append("<tr id='"+element.id+"'><td>"+element.businessname+"</td><td>"+element.ownername+"</td><td>"+element.whatsappnumber+"</td><td>"+element.state+"("+element.city+")</td></tr>");
      });

      $('#datatablestransporters ').DataTable({
        "pageLength": 25
      }).draw();
    },
  }).done(function(){
    $('#datatablestransporters tbody tr').click(function(){
      window.location.replace("/admin/transporter/view?"+$(this).attr('id'));
    })
  });
}

function refreshtrucktable() {
  $.ajax({
    type: "get",
    url: '/api/trucks',
    datatype: 'json',
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      $("#datatablestrucks").DataTable().destroy();
      $("#datatablestrucks tbody").empty();

      $.each(data, function(index, element){
        $("#datatablestrucks tbody").append("<tr id='"+element.id+"'><td>"+element.type+"</td><td>"+element.style+"</td><td>"+element.category+"</td><td>"+element.size+"</td><td>"+element.capacity+"</td></tr>");
      });

      $('#datatablestrucks').DataTable({
        "pageLength": 25
      }).draw();
    },
  }).done(function() {
    $("#datatablestrucks tbody tr").click(function() {
      $.ajax({
        type: "get",
        url: '/api/trucks/'+$(this).attr('id'),
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
          $('#truckid').val('');
          $('#trucktypestyle').empty();
          $("#truckviewcard tbody").empty();

          $('#truckentirecard').removeClass('d-none');
          $('#truckcollapse').collapse("hide");

          $('#truckid').val(data.id);
          $('#trucktypestyle').append(data.type + ' ' + data.style);
          $("#truckviewcard tbody").append("<tr><th>Type</th><td>"+data.type+"</td></tr><tr><th>Style</th><td>"+data.style+"</td></tr><tr><th>Category</th><td>"+data.category+"</td></tr><tr><th>Size</th><td>"+data.size+"</td></tr><tr><th>Capacity</th><td>"+data.capacity+"</td></tr>");

          $("#trucktype").val(data.type);
          $("#truckstyle").val(data.style);
          $("#truckcategory").val(data.category);
          $("#trucksize").val(data.size);
          $("#truckcapacity").val(data.capacity);
        },
      })
    })
  })
}

function truckvalidation() {
  dataiscorrect = true;
  invalidrequired = "";
  invaliddatatype = "";

  if($('#trucktype').val() === "") {
    invalidrequired += "<li><b>Truck Type</b> is required.";
    $('#trucktype').addClass('is-invalid');
    dataiscorrect = false;
  } else {
    $('#trucktype').removeClass('is-invalid');
  }

  if($('#trucksize').val() !== "") {
    if(isNaN($('#trucksize').val())){
      invaliddatatype += "<li><b>Truck Size</b> should be integer(e.g., 1642).";
      $('#trucksize').addClass('is-invalid');
      dataiscorrect = false;
    } else {
      $('#trucksize').removeClass('is-invalid');
    }
  } else {
    $('#trucksize').removeClass('is-invalid');
  }

  if($('#truckcapacity').val() !== "") {
    if(isNaN($('#truckcapacity').val())){
      invaliddatatype += "<li><b>Truck Capacity</b> should be integer(e.g., 1642).";
      $('#truckcapacity').addClass('is-invalid');
      dataiscorrect = false;
    } else {
      $('#truckcapacity').removeClass('is-invalid');
    }
  } else {
    $('#truckcapacity').removeClass('is-invalid');
  }

  if(!dataiscorrect) {
    $("#truckmodalcontent").empty();
    appendInvalidData = "";
    invalidrequired !== "" ? appendInvalidData += "<h6>Required*</h6><ul>"+invalidrequired+"</ul>":null;
    invaliddatatype !== "" ? appendInvalidData += "<h6>Data Types*</h6><ul>"+invaliddatatype+"</ul>":null;
    $("#truckmodalcontent").append(appendInvalidData);
    $("#truckmodal").modal();
    return false;
  }

  return true;
}

function transportervalidation() {
  dataiscorrect = true;
  invalidrequired = "";
  invaliddatatype = "";

  if($('#transporteraadhar').val() !== "") {
    if(!/^[0-9]{12}$/.test($("#transporteraadhar").val())){
      invaliddatatype += "<li><b>Aadhar Number</b> is invalid.";
      $('#transporteraadhar').addClass('is-invalid');
      dataiscorrect = false;
    } else {
      $('#transporteraadhar').removeClass('is-invalid');
    }
  } else {
    $('#transporteraadhar').removeClass('is-invalid');
  }
  if($('#transporterpan').val() !== "") {
    if(!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test($("#transporterpan").val())){
      invaliddatatype += "<li><b>PAN Number</b> is invalid.";
      $('#transporterpan').addClass('is-invalid');
      dataiscorrect = false;
    } else {
      $('#transporterpan').removeClass('is-invalid');
    }
  } else {
    $('#transporterpan').removeClass('is-invalid');
  }
  if($('#transportergst').val() !== "") {
    if(!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test($("#transportergst").val())){
      invaliddatatype += "<li><b>GST Number</b> is invalid.";
      $('#transportergst').addClass('is-invalid');
      dataiscorrect = false;
    } else {
      $('#transportergst').removeClass('is-invalid');
    }
  } else {
    $('#transporterpan').removeClass('is-invalid');
  }

  if($('#basiccitystate').val() === null) {
    invalidrequired += "<li><b>State</b> is required.";
    $('#basiccitystate').addClass('is-invalid');
    dataiscorrect = false;
  } else {
    $('#basiccitystate').removeClass('is-invalid');
  }
  if($('#transportername').val() === "") {
    invalidrequired += "<li><b>Transporter Name</b> is required.";
    $('#transportername').addClass('is-invalid');
    dataiscorrect = false;
  } else {
    $('#transportername').removeClass('is-invalid');
  }
  if($('#ownername').val() === "") {
    invalidrequired += "<li><b>Owner Name</b> is required.";
    $('#ownername').addClass('is-invalid');
    dataiscorrect = false;
  } else {
    $('#ownername').removeClass('is-invalid');
  }

  for (i=1;i<=5;i++){
    if($("#multiplecontact1"+i).val() !== "" || $("#multiplecontact2"+i).val() !== "" || $("#multiplewhatsappmobile"+i).val() !== "") {
      if($("#multiplename"+i).val() === "") {
        invalidrequired += "<li><b>Contact "+i+"</b> is invalid.";
        $('#multiplename'+i).addClass('is-invalid');
        dataiscorrect = false;
      } else {
        $('#multiplename'+i).removeClass('is-invalid');
      }
    } else {
      $('#multiplename'+i).removeClass('is-invalid');
    }
  }

  for ( i = 1; i <= 5; i++ ) {
    if($("#fromservicecitystate"+i).val() !== null || $("#fromservicecity"+i).val().length > 0 || $("#toservicecitystate"+i).val() !== null || $("#toservicecity"+i).val().length > 0 || $("#truckselect"+i).val().length > 0 || $("#commodities"+i).val() !== "") {
      if($("#fromservicecitystate"+i).val() === null || $("#fromservicecity"+i).val().length === 0 || $("#toservicecitystate"+i).val() === null || $("#toservicecity"+i).val().length === 0) {
        invalidrequired += "<li><b>Service "+i+"</b> is invalid.";
        dataiscorrect = false;
      }
    }
  }

  for ( i = 1; i <= 5; i++ ) {
    if($("#bankholdername"+i).val() !== "" || $("#accountnumber"+i).val() !== "" || $("#bankname"+i).val() !== "" || $("#bankbranch"+i).val() !== "" || $("#ifsccode"+i).val() !== "") {
      if($("#bankholdername"+i).val() === "" || $("#accountnumber"+i).val() === "" || $("#ifsccode"+i).val() === "") {
        invalidrequired += "<li><b>Bank Account "+i+"</b> is invalid.";
        dataiscorrect = false;
      }

      $("#bankholdername"+i).val() === "" ? $('#bankholdername'+i).addClass('is-invalid') : $('#bankholdername'+i).removeClass('is-invalid');
      $("#accountnumber"+i).val() === "" ? $('#accountnumber'+i).addClass('is-invalid') : $('#accountnumber'+i).removeClass('is-invalid');
      $("#ifsccode"+i).val() === "" ? $('#ifsccode'+i).addClass('is-invalid') : $('#ifsccode'+i).removeClass('is-invalid');
    } else {
      $('#bankholdername'+i).removeClass('is-invalid');
      $('#accountnumber'+i).removeClass('is-invalid');
      $('#ifsccode'+i).removeClass('is-invalid');
    }
  }

  if(!dataiscorrect) {
    $("#transportermodalcontent").empty();
    appendInvalidData = "";
    invalidrequired !== "" ? appendInvalidData += "<h6>Required*</h6><ul>"+invalidrequired+"</ul>":null;
    invaliddatatype !== "" ? appendInvalidData += "<h6>Data Types*</h6><ul>"+invaliddatatype+"</ul>":null;
    $("#transportermodalcontent").append(appendInvalidData);
    $("#transportermodal").modal();
    return false;
  }

  return true;
}

function deleteServices(transporter) {
  $.ajax({
    type: "delete",
    url: '/api/services/'+transporter,
  });
}

function deleteContacts(transporter) {
  $.ajax({
    type: "delete",
    url: '/api/contacts/'+transporter,
  });
}

function deleteBanks(transporter) {
  $.ajax({
    type: "delete",
    url: '/api/banks/'+transporter,
  });
}

function getState(cityId) {
  if (cityId >= 1 && cityId < 78) {return 1;}         if (cityId >= 692 && cityId < 701) {return 692;}       if (cityId >= 1357 && cityId < 1369) {return 1357;}       if (cityId >= 2122 && cityId < 2181) {return 2122;}
  if (cityId >= 78 && cityId < 320) {return 78;}      if (cityId >= 701 && cityId < 715) {return 701;}       if (cityId >= 1369 && cityId < 1621) {return 1369;}       if (cityId >= 2181 && cityId < 2359) {return 2181;}
  if (cityId >= 320 && cityId < 363) {return 320;}    if (cityId >= 715 && cityId < 885) {return 715;}       if (cityId >= 1621 && cityId < 1923) {return 1621;}       if (cityId >= 2359 && cityId < 2405) {return 2359;}
  if (cityId >= 363 && cityId < 420) {return 363;}    if (cityId >= 885 && cityId < 943) {return 885;}       if (cityId >= 1923 && cityId < 1945) {return 1923;}       if (cityId >= 2405 && cityId < 2545) {return 2405;}
  if (cityId >= 420 && cityId < 535) {return 420;}    if (cityId >= 943 && cityId < 979) {return 943;}       if (cityId >= 1945 && cityId < 1963) {return 1945;}       if (cityId >= 2545 && cityId < 2558) {return 2545;}
  if (cityId >= 535 && cityId < 537) {return 535;}    if (cityId >= 979 && cityId < 1016) {return 979;}      if (cityId >= 1963 && cityId < 1972) {return 1963;}       if (cityId >= 2558 && cityId < 2769) {return 2558;}
  if (cityId >= 537 && cityId < 656) {return 537;}    if (cityId >= 1016 && cityId < 1093) {return 1016;}    if (cityId >= 1972 && cityId < 1982) {return 1972;}       if (cityId >= 2769 && cityId < 2803) {return 2769;}
  if (cityId >= 656 && cityId < 684) {return 656;}    if (cityId >= 1093 && cityId < 1284) {return 1093;}    if (cityId >= 1982 && cityId < 2114) {return 1982;}       if (cityId >= 2803) {return 2803;}
  if (cityId >= 684 && cityId < 692) {return 684;}    if (cityId >= 1284 && cityId < 1357) {return 1284;}    if (cityId >= 2114 && cityId < 2122) {return 2114;}
}
