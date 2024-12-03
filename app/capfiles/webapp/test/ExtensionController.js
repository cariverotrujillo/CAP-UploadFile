sap.ui.define(["sap/m/MessageBox", "sap/m/MessageToast", "sap/ui/core/UIComponent"],
    function (MessageBox, MessageToast, UIComponent) {
        "use strict";
        function _createUploadController(oExtensionAPI, Entity) {
            var oUploadDialog;

            function setOkButtonEnabled(bOk) {
                oUploadDialog && oUploadDialog.getBeginButton().setEnabled(bOk);
            }

            function setDialogBusy(bBusy) {
                oUploadDialog.setBusy(bBusy)
            }

            function closeDialog() {
                oUploadDialog && oUploadDialog.close()
            }

            function showError(code, target, sMessage) {
                MessageBox.error("Upload failed", {title: "Error"})
            }

            function byId(sId) {
                return sap.ui.core.Fragment.byId("ExcelUploadDialog", sId);
            }

            return {
                onBeforeOpen: function (oEvent) {
                    oUploadDialog = oEvent.getSource();
                    oExtensionAPI.addDependent(oUploadDialog);
                },

                onAfterClose: function (oEvent) {
                    oExtensionAPI.removeDependent(oUploadDialog);
                    oUploadDialog.destroy();
                    oUploadDialog = undefined;
                },

                onOk: function (oEvent) {
                    setDialogBusy(true)

/*                      var oFileUploader = byId("uploader");
                   var headPar = new sap.ui.unified.FileUploaderParameter();
                    headPar.setName('slug');
                    headPar.setValue(Entity);
                    oFileUploader.removeHeaderParameter('slug');
                    oFileUploader.addHeaderParameter(headPar);
                    var sUploadUri = oExtensionAPI._controller.extensionAPI._controller._oAppComponent.getManifestObject().resolveUri("./PadronSrv/ExcelUpload/excel")
                    oFileUploader.setUploadUrl(sUploadUri); */
                     let oFileUploader = byId("uploader");
                    oFileUploader.setSendXHR(true);
                    oFileUploader.removeHeaderParameter('slug');
                    oFileUploader.removeHeaderParameter('X-CSRF-Token');

                    oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter("slug", { name: "slug", value: Entity }));
                    oFileUploader.addHeaderParameter(new sap.ui.unified.FileUploaderParameter("X-CSRF-Token", {
                        name: "X-CSRF-Token", value: oExtensionAPI.getModel().getHttpHeaders()["X-CSRF-Token"]
                    }));
                    oFileUploader
                        .checkFileReadable()
                        .then(function () {
                          let file =  oFileUploader.upload();
                        })
                        .catch(function (error) {
                            showError("The file cannot be read.");
                            setDialogBusy(false)
                        })
                },
                onCancel: function (oEvent) {
                    closeDialog();
                },

                onTypeMismatch: function (oEvent) {
                    var sSupportedFileTypes = oEvent
                        .getSource()
                        .getFileType()
                        .map(function (sFileType) {
                            return "*." + sFileType;
                        })
                        .join(", ");

                    showError(
                        "The file type *." +
                        oEvent.getParameter("fileType") +
                        " is not supported. Choose one of the following types: " +
                        sSupportedFileTypes
                    );
                },

                onFileAllowed: function (oEvent) {
                    setOkButtonEnabled(true)
                },

                onFileEmpty: function (oEvent) {
                    setOkButtonEnabled(false)
                },

                onUploadComplete: function (oEvent) {
                    var iStatus = oEvent.getParameter("status");
                    var oFileUploader = oEvent.getSource()

                    oFileUploader.clear();
                    setOkButtonEnabled(false)
                    setDialogBusy(false)

                    if (iStatus >= 400) {
                        var oRawResponse;
                        try {
                            oRawResponse = JSON.parse(oEvent.getParameter("responseRaw"));
                        } catch (e) {
                            oRawResponse = oEvent.getParameter("responseRaw");
                        }
                        if (oRawResponse && oRawResponse.error && oRawResponse.error.message) {
                            showError(oRawResponse.error.code, oRawResponse.error.target, oRawResponse && oRawResponse.error && oRawResponse.error.message);
                        }
                    } else {
                        MessageToast.show("File uploaded successfully");
                        oExtensionAPI.refresh()
                        closeDialog();
                    }
                }
            };
        };

        return {
            Upload: function (oBindingContext, aSelectedContexts) {
                this.loadFragment({
                    id: "ExcelUploadDialog",
                    name: "com.padron.capfiles.test.ExcelUploadDialog",
                    controller: _createUploadController(this, 'Padron')
                }).then(function (oDialog) {
                    oDialog.open();
                });
            }
        };
    });