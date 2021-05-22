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
      url: '/api/states',
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
      url: '/api/cities/'+$("#"+id).val(),
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
        $("#transporterid").val(data.id);
        $("#viewbusinessname").append(data.businessname);
        $("#viewownername").append(data.ownername + ", " + data.type + ", " + data.ratingstring);
        $("#viewaadhar").append(data.aadhar);
        $("#viewpan").append(data.pan);
        $("#viewgst").append(data.gst);
        $("#viewwhatsappnumber").append(data.whatsappnumber);
        $("#viewemailaddress").append(data.email);
        $("#viewreferrername").append(data.referrername + " ("+data.referrermobile+")");
        $("#headbranch").append(data.headbranchname);
        $("#headbranch").attr('href', "/admin/transporter/view?"+data.headbranch);

        $("#viewname1").append(data.name1);
        $("#viewname2").append(data.name2);
        $("#viewname3").append(data.name3);
        $("#viewname4").append(data.name4);
        $("#viewname5").append(data.name5);
        $("#viewmobile11").append(data.mobile11);
        $("#viewmobile12").append(data.mobile12);
        $("#viewmobile13").append(data.mobile13);
        $("#viewmobile14").append(data.mobile14);
        $("#viewmobile15").append(data.mobile15);
        $("#viewmobile21").append(data.mobile21);
        $("#viewmobile22").append(data.mobile22);
        $("#viewmobile23").append(data.mobile23);
        $("#viewmobile24").append(data.mobile24);
        $("#viewmobile25").append(data.mobile25);
        $("#viewwhatsapp1").append(data.whatsappnumber1);
        $("#viewwhatsapp2").append(data.whatsappnumber2);
        $("#viewwhatsapp3").append(data.whatsappnumber3);
        $("#viewwhatsapp4").append(data.whatsappnumber4);
        $("#viewwhatsapp5").append(data.whatsappnumber5);

        $("#viewaddress").append(data.address+" ,"+data.statestring+", "+data.citystring+" ,"+data.area);
        $("#viewbusinessname").append(" ,"+data.statestring+", "+data.citystring+" ,"+data.area);

        $("#viewvisitingcardcarouselinner").empty();
        $.each(data.visitingcardstring.split(';'), function(index,element) {
          if ( $("#viewvisitingcardcarouselinner").children().length > 0 ) {
            $("#viewvisitingcardcarouselinner").append("<div class='carousel-item'><img class='img-responsive' width='500' height='250' src='/storage/"+element+"'>");
          } else {
            $("#viewvisitingcardcarouselinner").append("<div class='carousel-item active'><img class='img-responsive' width='500' height='250' src='/storage/"+element+"'>");
          }
        });

        $("#fromstate1").append(data.fromstatestring1);
        $("#fromstate2").append(data.fromstatestring2);
        $("#fromstate3").append(data.fromstatestring3);
        $("#fromstate4").append(data.fromstatestring4);
        $("#fromstate5").append(data.fromstatestring5);
        $("#fromcities1").append(data.fromcitystring1);
        $("#fromcities2").append(data.fromcitystring2);
        $("#fromcities3").append(data.fromcitystring3);
        $("#fromcities4").append(data.fromcitystring4);
        $("#fromcities5").append(data.fromcitystring5);
        $("#tostate1").append(data.tostatestring1);
        $("#tostate2").append(data.tostatestring2);
        $("#tostate3").append(data.tostatestring3);
        $("#tostate4").append(data.tostatestring4);
        $("#tostate5").append(data.tostatestring5);
        $("#tocities1").append(data.tocitystring1);
        $("#tocities2").append(data.tocitystring2);
        $("#tocities3").append(data.tocitystring3);
        $("#tocities4").append(data.tocitystring4);
        $("#tocities5").append(data.tocitystring5);
        $("#trucks1").append(data.truckstring1+"</br>");
        $("#trucks2").append(data.truckstring2+"</br>");
        $("#trucks3").append(data.truckstring3+"</br>");
        $("#trucks4").append(data.truckstring4+"</br>");
        $("#trucks5").append(data.truckstring5+"</br>");
        $("#commodities1").append(data.commodity1);
        $("#commodities2").append(data.commodity2);
        $("#commodities3").append(data.commodity3);
        $("#commodities4").append(data.commodity4);
        $("#commodities5").append(data.commodity5);

        $("#holdername1").append(data.holdername1);
        $("#holdername2").append(data.holdername2);
        $("#holdername3").append(data.holdername3);
        $("#holdername4").append(data.holdername4);
        $("#holdername5").append(data.holdername5);
        $("#accountnumber1").append(data.accountnumber1);
        $("#accountnumber2").append(data.accountnumber2);
        $("#accountnumber3").append(data.accountnumber3);
        $("#accountnumber4").append(data.accountnumber4);
        $("#accountnumber5").append(data.accountnumber5);
        $("#bankname1").append(data.bankname1);
        $("#bankname2").append(data.bankname2);
        $("#bankname3").append(data.bankname3);
        $("#bankname4").append(data.bankname4);
        $("#bankname5").append(data.bankname5);
        $("#bankbranch1").append(data.branch1);
        $("#bankbranch2").append(data.branch2);
        $("#bankbranch3").append(data.branch3);
        $("#bankbranch4").append(data.branch4);
        $("#bankbranch5").append(data.branch5);
        $("#ifsccode1").append(data.ifsccode1);
        $("#ifsccode2").append(data.ifsccode2);
        $("#ifsccode3").append(data.ifsccode3);
        $("#ifsccode4").append(data.ifsccode4);
        $("#ifsccode5").append(data.ifsccode5);

        $("#viewdocumentfill").empty();
        $.each(data.documentstring.split(";"), function(index, element) {
          $("#viewdocumentfill").append("<div class='card-body'><img src='/storage/"+element+"' height=275 width=550 /></div>");
        });

        $('#edittransporteranchor').attr("href", "/admin/transporter/edit?"+id);
      }
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
          $('#'+id+"string").val($('#'+id+"string").val() !== "" ? $('#'+id+"string").val() + ";" + element.path : $('#'+id+"string").val() + element.path);
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
          $('#'+id+"string").val($('#'+id+"string").val() !== "" ? $('#'+id+"string").val() + ";" + element.path : $('#'+id+"string").val() + element.path);
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
        $("#documentsid").val(data.documents);
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

  $("#deletetransporterconfirm").click(function(){
    $.ajax({
      type: "delete",
      url: '/api/transporters/'+$('#transporterid').val(),
      success: function() {
        deleteContacts($('#transporterid').val());
        deleteBanks($('#transporterid').val());
        deleteServices($('#transporterid').val());
        var notyf = new Notyf();
        notyf.success('Your transporter has been deleted successfully.');
        window.location.replace("/admin/transporter/index");
      }
    });
  });

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
        setTimeout(function(){window.location.replace("/admin/transporter/view?"+data.id);}, 1000);
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
    formData.append("rating", $("#ratings").val());
    formData.append("ratingstring", $("#ratings option:selected").text());
    formData.append("email", $("#emailaddress").val());
    formData.append("whatsappnumber", $("#whatsappmobile").val());
    formData.append("aadhar", $("#transporteraadhar").val());
    formData.append("pan", $("#transporterpan").val());
    formData.append("gst", $("#transportergst").val());
    formData.append("address", $("#address").val());
    formData.append("state", $("#basiccity").val());
    formData.append("statestring", $("#basiccity option:selected").text());
    formData.append("city", $("#basiccity").val());
    formData.append("citystring", $("#basiccity option:selected").text());
    formData.append("area", $("#basicarea").val());
    formData.append("headbranch", $("#isbranch").val());
    formData.append("headbranchname", $("#isbranch option:selected").text());
    formData.append("referrername", $("#referrername").val());
    formData.append("referrermobile", $("#referrermobile").val());
    formData.append("visitingcardid", $("#visitingcardid").val());
    formData.append("visitingcardstring", $("#visitingcardstring").val());
    formData.append("documentid", $("#documentsid").val());
    formData.append("documentstring", $("#documentsstring").val());

    formData.append("name1", $('#multiplename1').val());
    formData.append("mobile11", $('#multiplecontact11').val());
    formData.append("mobile21", $('#multiplecontact21').val());
    formData.append("whatsappnumber1", $('#multiplewhatsappmobile1').val());
    formData.append("name2", $('#multiplename2').val());
    formData.append("mobile12", $('#multiplecontact12').val());
    formData.append("mobile22", $('#multiplecontact22').val());
    formData.append("whatsappnumber2", $('#multiplewhatsappmobile2').val());
    formData.append("name3", $('#multiplename3').val());
    formData.append("mobile13", $('#multiplecontact13').val());
    formData.append("mobile23", $('#multiplecontact23').val());
    formData.append("whatsappnumber3", $('#multiplewhatsappmobile3').val());
    formData.append("name4", $('#multiplename4').val());
    formData.append("mobile14", $('#multiplecontact14').val());
    formData.append("mobile24", $('#multiplecontact24').val());
    formData.append("whatsappnumber4", $('#multiplewhatsappmobile4').val());
    formData.append("name5", $('#multiplename5').val());
    formData.append("mobile15", $('#multiplecontact15').val());
    formData.append("mobile25", $('#multiplecontact25').val());
    formData.append("whatsappnumber5", $('#multiplewhatsappmobile5').val());

    formData.append("holdername1", $("#bankholdername1").val());
    formData.append("accountnumber1", $("#accountnumber1").val());
    formData.append("bankname1", $("#bankname1").val());
    formData.append("branch1", $("#bankbranch1").val());
    formData.append("ifsccode1", $("#ifsccode1").val());
    formData.append("holdername2", $("#bankholdername2").val());
    formData.append("accountnumber2", $("#accountnumber2").val());
    formData.append("bankname2", $("#bankname2").val());
    formData.append("branch2", $("#bankbranch2").val());
    formData.append("ifsccode2", $("#ifsccode2").val());
    formData.append("holdername3", $("#bankholdername3").val());
    formData.append("accountnumber3", $("#accountnumber3").val());
    formData.append("bankname3", $("#bankname3").val());
    formData.append("branch3", $("#bankbranch3").val());
    formData.append("ifsccode3", $("#ifsccode3").val());
    formData.append("holdername4", $("#bankholdername4").val());
    formData.append("accountnumber4", $("#accountnumber4").val());
    formData.append("bankname4", $("#bankname4").val());
    formData.append("branch4", $("#bankbranch4").val());
    formData.append("ifsccode4", $("#ifsccode4").val());
    formData.append("holdername5", $("#bankholdername5").val());
    formData.append("accountnumber5", $("#accountnumber5").val());
    formData.append("bankname5", $("#bankname5").val());
    formData.append("branch5", $("#bankbranch5").val());
    formData.append("ifsccode5", $("#ifsccode5").val());

    formData.append("fromstate1", $("#fromservicecitystate1").val());
    formData.append("fromstate2", $("#fromservicecitystate2").val());
    formData.append("fromstate3", $("#fromservicecitystate3").val());
    formData.append("fromstate4", $("#fromservicecitystate4").val());
    formData.append("fromstate5", $("#fromservicecitystate5").val());
    formData.append("fromstatestring1", $("#fromservicecitystate1 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromstatestring2", $("#fromservicecitystate2 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromstatestring3", $("#fromservicecitystate3 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromstatestring4", $("#fromservicecitystate4 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromstatestring5", $("#fromservicecitystate5 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tostate1", $("#toservicecitystate1").val());
    formData.append("tostate2", $("#toservicecitystate2").val());
    formData.append("tostate3", $("#toservicecitystate3").val());
    formData.append("tostate4", $("#toservicecitystate4").val());
    formData.append("tostate5", $("#toservicecitystate5").val());
    formData.append("tostatestring1", $("#toservicecitystate1 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tostatestring2", $("#toservicecitystate2 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tostatestring3", $("#toservicecitystate3 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tostatestring4", $("#toservicecitystate4 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tostatestring5", $("#toservicecitystate5 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromcity1", $("#fromservicecity1").val().join(";"));
    formData.append("fromcity2", $("#fromservicecity2").val().join(";"));
    formData.append("fromcity3", $("#fromservicecity3").val().join(";"));
    formData.append("fromcity4", $("#fromservicecity4").val().join(";"));
    formData.append("fromcity5", $("#fromservicecity5").val().join(";"));
    formData.append("fromcitystring1", $("#fromservicecity1 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromcitystring2", $("#fromservicecity2 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromcitystring3", $("#fromservicecity3 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromcitystring4", $("#fromservicecity4 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("fromcitystring5", $("#fromservicecity5 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tocity1", $("#toservicecity1").val().join(";"));
    formData.append("tocity2", $("#toservicecity2").val().join(";"));
    formData.append("tocity3", $("#toservicecity3").val().join(";"));
    formData.append("tocity4", $("#toservicecity4").val().join(";"));
    formData.append("tocity5", $("#toservicecity5").val().join(";"));
    formData.append("tocitystring1", $("#toservicecity1 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tocitystring2", $("#toservicecity2 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tocitystring3", $("#toservicecity3 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tocitystring4", $("#toservicecity4 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("tocitystring5", $("#toservicecity5 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("truck1", $("#truckselect1").val().join(";"));
    formData.append("truck2", $("#truckselect2").val().join(";"));
    formData.append("truck3", $("#truckselect3").val().join(";"));
    formData.append("truck4", $("#truckselect4").val().join(";"));
    formData.append("truck5", $("#truckselect5").val().join(";"));
    formData.append("truckstring1", $("#truckselect1 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("truckstring2", $("#truckselect2 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("truckstring3", $("#truckselect3 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("truckstring4", $("#truckselect4 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("truckstring5", $("#truckselect5 option:selected").toArray().map(item => item.text).join(';'));
    formData.append("commodity1", $("#commodities1").val());
    formData.append("commodity2", $("#commodities2").val());
    formData.append("commodity3", $("#commodities3").val());
    formData.append("commodity4", $("#commodities4").val());
    formData.append("commodity5", $("#commodities5").val());

    var notyf = new Notyf();

    $.ajax({
      type: "post",
      url: '/api/transporters',
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data) {
        notyf.success('Your changes have been successfully saved!');
        window.location.replace("/admin/transporter/view?"+data.id);
      },
      error: function() {
        notyf.error('Error occured!! Your change is not saved.');
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

function copyURI(evt) {
    evt.preventDefault();
    navigator.clipboard.writeText(evt.target.innerHTML).then(() => {
      var notyf = new Notyf();
      notyf.success('Copied Successfully!');
    }, () => {
      notyf.error('Not copied, Please try again!');
    });
}
