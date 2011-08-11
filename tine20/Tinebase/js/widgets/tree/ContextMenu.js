/*
 * Tine 2.0
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2009 Metaways Infosystems GmbH (http://www.metaways.de)
 *
 */
Ext.ns('Tine.widgets', 'Tine.widgets.tree');

/**
 * returns generic tree context menu with
 * - create/add
 * - rename
 * - delete
 * - edit grants
 * 
 * ctxNode class var is required in calling class
 */
Tine.widgets.tree.ContextMenu = {
	
    /**
     * create new Ext.menu.Menu with actions
     * 
     * @param {} config has the node name, actions, etc.
     * @return {}
     */
	getMenu: function(config) {
        
        this.config = config;
                
        /***************** define action handlers *****************/
        var handler = {
            /**
             * create
             */
//            addNode: function() {
//                Ext.MessageBox.prompt(String.format(_('New {0}'), config.nodeName), String.format(_('Please enter the name of the new {0}:'), config.nodeName), function(_btn, _text) {
//                    if( this.ctxNode && _btn == 'ok') {
//                        if (! _text) {
//                            Ext.Msg.alert(String.format(_('No {0} added'), config.nodeName), String.format(_('You have to supply a {0} name!'), config.nodeName));
//                            return;
//                        }
//                        Ext.MessageBox.wait(_('Please wait'), String.format(_('Creating {0}...' ), config.nodeName));
//                        var parentNode = this.ctxNode;
//                        
//                        var params = {
//                            method: config.backend + '.add' + config.backendModel,
//                            name: _text
//                        };
//                        
//                        // TODO try to generalize this and move app specific stuff to app
//                        
//                        if (config.backendModel == 'Node') {
//                            params.application = this.app.appName || this.appName;                            
//                            var filename = parentNode.attributes.container.path + '/' + _text;
//                            params.filename = filename;
//                            params.type = 'folder';
//                            params.method = config.backend + ".createNode";
//                        }
//                        else if (config.backendModel == 'Container') {
//                            params.application = this.app.appName || this.appName;
//                            params.containerType = Tine.Tinebase.container.path2type(parentNode.attributes.path);
//                        } 
//                        else if (config.backendModel == 'Folder') {
//                            var parentFolder = Tine.Tinebase.appMgr.get('Felamimail').getFolderStore().getById(parentNode.attributes.folder_id);
//                            params.parent = parentFolder.get('globalname');
//                            params.accountId = parentFolder.get('account_id');
//                        }
//                        
//                        Ext.Ajax.request({
//                            params: params,
//                            scope: this,
//                            success: function(_result, _request){
//                                var nodeData = Ext.util.JSON.decode(_result.responseText);
//                                
//                                // TODO add + icon if it wasn't expandable before
//                                if(nodeData.type == 'folder') {
//                                    parentNode.reload();
//                                }
//                                else {
//                                    var newNode = this.loader.createNode(nodeData);
//                                    parentNode.appendChild(newNode);
//                                }
//                                
//                                parentNode.expand();
//                                this.fireEvent('containeradd', nodeData);
//                                
//                                // TODO: im event auswerten
//                                if (config.backendModel == 'Node') {
//                                    this.app.mainScreen.GridPanel.getStore().reload();
//                                }
//
//                                Ext.MessageBox.hide();
//                            }
//                        });
//                        
//                    }
//                }, this);
//            },
            
            /**
             * delete
             */
//            deleteNode: function() {
//                if (this.ctxNode) {
//                    var node = this.ctxNode;
//                    Ext.MessageBox.confirm(_('Confirm'), String.format(_('Do you really want to delete the {0} "{1}"?'), config.nodeName, node.text), function(_btn){
//                        if ( _btn == 'yes') {
//                            Ext.MessageBox.wait(_('Please wait'), String.format(_('Deleting {0} "{1}"' ), config.nodeName , node.text));
//                            
//                            var params = {
//                                method: config.backend + '.delete' + config.backendModel
//                            };
//                            
//                            if (config.backendModel == 'Node') {
//                                params.application = this.app.appName || this.appName;                                
//                                var filename = this.ctxNode.attributes.path;
//                                params.filenames = [filename];
//                                params.method = config.backend + ".deleteNodes";
//                            
//                            } else if (config.backendModel == 'Container') {
//                                params.containerId = node.attributes.container.id
//                            } else if (config.backendModel == 'Folder') {
//                                var folder = Tine.Tinebase.appMgr.get('Felamimail').getFolderStore().getById(node.attributes.folder_id);
//                                params.folder = folder.get('globalname');
//                                params.accountId = folder.get('account_id');
//                            } else {
//                                // use default json api style
//                                params.ids = [node.id];
//                                params.method = params.method + 's';
//                            }
//                            
//                            Ext.Ajax.request({
//                                params: params,
//                                scope: this,
//                                success: function(_result, _request){
//                                    if(node.isSelected()) {
//                                        this.getSelectionModel().select(node.parentNode);
//                                        this.fireEvent('click', node.parentNode, Ext.EventObject.setEvent());
//                                    }
//                                    node.remove();
//                                    if (config.backendModel == 'Container') {
//                                        this.fireEvent('containerdelete', node.attributes.container);
//                                    } else {
//                                        this.fireEvent('containerdelete', node.attributes);
//                                    }
//                                    Ext.MessageBox.hide();
//                                }
//                            });
//                        }
//                    }, this);
//                }
//            },
            
            /**
             * rename
             */
//            renameNode: function() {
//                if (this.ctxNode) {
//                    var node = this.ctxNode;
//                    Ext.MessageBox.show({
//                        title: 'Rename ' + config.nodeName,
//                        msg: String.format(_('Please enter the new name of the {0}:'), config.nodeName),
//                        buttons: Ext.MessageBox.OKCANCEL,
//                        value: node.text,
//                        fn: function(_btn, _text){
//                            if (_btn == 'ok') {
//                                if (! _text) {
//                                    Ext.Msg.alert(String.format(_('Not renamed {0}'), config.nodeName), String.format(_('You have to supply a {0} name!'), config.nodeName));
//                                    return;
//                                }
//                                Ext.MessageBox.wait(_('Please wait'), String.format(_('Updating {0} "{1}"'), config.nodeName, node.text));
//                                
//                                var params = {
//                                    method: config.backend + '.rename' + config.backendModel,
//                                    newName: _text
//                                };
//                                
//                                if (config.backendModel == 'Node') {
//                                    params.application = this.app.appName || this.appName;                                
//                                    var filename = this.ctxNode.attributes.path;
//                                    params.sourceFilenames = [filename];
//                                    
//                                    var targetFilename = "/";
//                                    var sourceSplitArray = filename.split("/");
//                                    for (var i=1; i<sourceSplitArray.length-1; i++) {
//                                        targetFilename += sourceSplitArray[i] + '/'; 
//                                    }
//                                    
//                                    params.destinationFilenames = [targetFilename + _text];
//                                    params.method = config.backend + '.moveNodes';
//                                }
//                                
//                                // TODO try to generalize this
//                                if (config.backendModel == 'Container') {
//                                    params.containerId = node.attributes.container.id;
//                                } else if (config.backendModel == 'Folder') {
//                                    var folder = Tine.Tinebase.appMgr.get('Felamimail').getFolderStore().getById(node.attributes.folder_id);
//                                    params.oldGlobalName = folder.get('globalname');
//                                    params.accountId = folder.get('account_id');
//                                }
//                                
//                                Ext.Ajax.request({
//                                    params: params,
//                                    scope: this,
//                                    success: function(_result, _request){
//                                        var nodeData = Ext.util.JSON.decode(_result.responseText);
//                                        node.setText(_text);
//                                        this.fireEvent('containerrename', nodeData);
//                                        Ext.MessageBox.hide();
//                                    }
//                                });
//                            }
//                        },
//                        scope: this,
//                        prompt: true,
//                        icon: Ext.MessageBox.QUESTION
//                    });
//                }
//            },
//            
            /**
             * set color
             */
//            changeNodeColor: function(cp, color) {
//                if (this.ctxNode) {
//                    var node = this.ctxNode;
//                    node.getUI().addClass("x-tree-node-loading");
//                        Ext.Ajax.request({
//                            params: {
//                                method: config.backend + '.set' + config.backendModel + 'Color',
//                                containerId: node.attributes.container.id,
//                                color: '#' + color
//                            },
//                            scope: this,
//                            success: function(_result, _request){
//                                var nodeData = Ext.util.JSON.decode(_result.responseText);
//                                node.getUI().colorNode.setStyle({color: nodeData.color});
//                                node.attributes.container.color = nodeData.color;
//                                this.fireEvent('containercolorset', nodeData);
//                                node.getUI().removeClass("x-tree-node-loading");
//                            }
//                        });
//                
//                }
//            },
            
            /**
             * manage permissions
             * 
             */
//            managePermissions: function() {
//                if (this.ctxNode) {
//                    var node = this.ctxNode;
//                    
//                    var grantContainer = node.attributes.container;
//                    if(grantContainer.name.id) {
//                        grantContainer = grantContainer.name;
//                    }
//                    
//                    var window = Tine.widgets.container.GrantsDialog.openWindow({
//                        title: String.format(_('Manage Permissions for {0} "{1}"'), config.nodeName, Ext.util.Format.htmlEncode(node.attributes.container.name)),
//                        containerName: config.nodeName,
//                        grantContainer: grantContainer
//                    });
//                }
//            },
            
//            /**
//             * reload node
//             */
//            reloadNode: function() {
//                if (this.ctxNode) {
//                    var tree = this;
//                    this.ctxNode.reload(function(node) {
//                        node.expand();
//                        node.select();
//                        // update grid
//                        tree.filterPlugin.onFilterChange();
//                    });                    
//                }
//            }
        };
        
        /****************** create ITEMS array ****************/
        
        
        this.action_add = new Ext.Action({
            text: String.format(_('Add')),
            iconCls: 'action_add',
            handler: this.addNode,
            scope: this.config
        });
        
        this.action_rename = new Ext.Action({
            text: String.format(_('Rename')),
            iconCls: 'action_rename',
            handler: this.renameNode,
            scope: this.config,
            requiredGrant: 'editGrant',
            allowMultiple: false
        });
        
        
        var i18n = new Locale.Gettext();
        i18n.textdomain('Tinebase');
        this.action_delete = new Ext.Action({
            text: String.format(_('Delete')),
            iconCls: 'action_delete',
            handler: this.deleteNode,
            scope: this.config,
            requiredGrant: 'deleteGrant',
            allowMultiple: true
        });
        
        this.action_grants = new Ext.Action({
            text: _('Manage permissions'),
            iconCls: 'action_managePermissions',
            handler: this.managePermissions,
            scope: this.config
        });
        
        this.action_changecolor = new Ext.Action({     
            text: String.format(_('Set color')),
            iconCls: 'action_changecolor',
            requiredGrant: 'deleteGrant',
            allowMultiple: true,
            menu: new Ext.menu.ColorMenu({
                scope: this,
                listeners: {
                    select: this.changeNodeColor,
                    scope: this.config
                }
            })                                        
        });
        
        this.action_reload = new Ext.Action({
            text: String.format(_('Reload')),
            iconCls: 'x-tbar-loading',
            handler: this.reloadNode,
            scope: this.config
        });
        
        this.action_resume = new Ext.Action({
            text: String.format(_('Resume upload'), config.nodeName),
            iconCls: 'action_resume',
            handler: this.onResume,
            scope: this.config,
            disabled: true
        });
        
        this.action_pause = new Ext.Action({
            text: String.format(_('Pause upload'), config.nodeName),
            iconCls: 'action_pause',
            handler: this.onPause,
            scope: this.config
        });
        
        
        var items = [];
        for (var i=0; i < config.actions.length; i++) {
            switch(config.actions[i]) {
                case 'add':
                    items.push(this.action_add);
                    break;
                case 'delete':                    
                    items.push(this.action_delete);
                    break;
                case 'rename':
                    items.push(this.action_rename);
                    break;
                case 'changecolor':
                    items.push(this.action_changecolor);
                    break;
                case 'grants':
                    items.push(this.action_grants);
                    break;
                case 'reload':
                    items.push(this.action_reload);
                    break;
                case 'resume':
                    items.push(this.action_resume);
                    break;
                case 'pause':
                    items.push(this.action_pause);
                    break;
                default:
                    // add custom actions
                    items.push(new Ext.Action(config.actions[i]));
            }
        }

             
        /******************* return menu **********************/
        
        return new Ext.menu.Menu({
		    items: items
		});
	},
    
	/**
	 * create tree node
	 */
	addNode: function() {
        Ext.MessageBox.prompt(String.format(_('New {0}'), this.nodeName), String.format(_('Please enter the name of the new {0}:'), this.nodeName), function(_btn, _text) {
            if( this.scope.ctxNode && _btn == 'ok') {
                if (! _text) {
                    Ext.Msg.alert(String.format(_('No {0} added'), this.nodeName), String.format(_('You have to supply a {0} name!'), this.nodeName));
                    return;
                }
                Ext.MessageBox.wait(_('Please wait'), String.format(_('Creating {0}...' ), this.nodeName));
                var parentNode = this.scope.ctxNode;
                
                var params = {
                    method: this.backend + '.add' + this.backendModel,
                    name: _text
                };
                
                // TODO try to generalize this and move app specific stuff to app
                
                if (this.backendModel == 'Node') {
                    params.application = this.scope.app.appName || this.scope.appName;                            
                    var filename = parentNode.attributes.container.path + '/' + _text;
                    params.filename = filename;
                    params.type = 'folder';
                    params.method = this.backend + ".createNode";
                }
                else if (this.backendModel == 'Container') {
                    params.application = this.scope.app.appName || this.scope.appName;
                    params.containerType = Tine.Tinebase.container.path2type(parentNode.attributes.path);
                } 
                else if (this.backendModel == 'Folder') {
                    var parentFolder = Tine.Tinebase.appMgr.get('Felamimail').getFolderStore().getById(parentNode.attributes.folder_id);
                    params.parent = parentFolder.get('globalname');
                    params.accountId = parentFolder.get('account_id');
                }
                
                Ext.Ajax.request({
                    params: params,
                    scope: this,
                    success: function(_result, _request){
                        var nodeData = Ext.util.JSON.decode(_result.responseText);
                        
                        // TODO add + icon if it wasn't expandable before
                        if(nodeData.type == 'folder') {
                            parentNode.reload();
                        }
                        else {
                            var newNode = this.loader.createNode(nodeData);
                            parentNode.appendChild(newNode);
                        }
                        
                        parentNode.expand();
                        this.scope.fireEvent('containeradd', nodeData);
                        
                        // TODO: im event auswerten
                        if (this.backendModel == 'Node') {
                            this.scope.app.mainScreen.GridPanel.getStore().reload();
                        }

                        Ext.MessageBox.hide();
                    }
                });
                
            }
        }, this);
    },
    
    /**
     * rename tree node
     */
    renameNode: function() {
        if (this.scope.ctxNode) {
            var node = this.scope.ctxNode;
            Ext.MessageBox.show({
                title: 'Rename ' + this.nodeName,
                msg: String.format(_('Please enter the new name of the {0}:'), this.nodeName),
                buttons: Ext.MessageBox.OKCANCEL,
                value: node.text,
                fn: function(_btn, _text){
                    if (_btn == 'ok') {
                        if (! _text) {
                            Ext.Msg.alert(String.format(_('Not renamed {0}'), this.nodeName), String.format(_('You have to supply a {0} name!'), this.nodeName));
                            return;
                        }
                        Ext.MessageBox.wait(_('Please wait'), String.format(_('Updating {0} "{1}"'), this.nodeName, node.text));
                        
                        var params = {
                            method: this.backend + '.rename' + this.backendModel,
                            newName: _text
                        };
                        
                        if (this.backendModel == 'Node') {
                            params.application = this.scope.app.appName || this.scope.appName;                                
                            var filename = node.attributes.path;
                            params.sourceFilenames = [filename];
                            
                            var targetFilename = "/";
                            var sourceSplitArray = filename.split("/");
                            for (var i=1; i<sourceSplitArray.length-1; i++) {
                                targetFilename += sourceSplitArray[i] + '/'; 
                            }
                            
                            params.destinationFilenames = [targetFilename + _text];
                            params.method = this.backend + '.moveNodes';
                        }
                        
                        // TODO try to generalize this
                        if (this.backendModel == 'Container') {
                            params.containerId = node.attributes.container.id;
                        } else if (this.backendModel == 'Folder') {
                            var folder = Tine.Tinebase.appMgr.get('Felamimail').getFolderStore().getById(node.attributes.folder_id);
                            params.oldGlobalName = folder.get('globalname');
                            params.accountId = folder.get('account_id');
                        }
                        
                        Ext.Ajax.request({
                            params: params,
                            scope: this,
                            success: function(_result, _request){
                                var nodeData = Ext.util.JSON.decode(_result.responseText);
                                node.setText(_text);
                                this.scope.fireEvent('containerrename', nodeData);
                                Ext.MessageBox.hide();
                                
                                // TODO: im event auswerten
                                if (this.backendModel == 'Node') {
                                    this.scope.app.mainScreen.GridPanel.getStore().reload();
                                }
                            }
                        });
                    }
                },
                scope: this,
                prompt: true,
                icon: Ext.MessageBox.QUESTION
            });
        }
    },
    
    /**
     * delete tree node
     */
    deleteNode: function() {
        
        if (this.scope.ctxNode) {
            var nodes = this.scope.ctxNode;

            var nodeName = "";
            var node;
            if(nodes && nodes.length) {
                node = null;
                for(var i=0; i<nodes.length; i++) {
                    var currNodeData = nodes[i].data;
                    
                    if(typeof currNodeData.name == 'object') {
                        nodeName += currNodeData.name.name + '; ';    
                    }
                    else {
                        nodeName += currNodeData.name + '; ';  
                    }
                }
            }
            else {
                node = nodes;
                nodes = null;
                nodeName = node.text;

            }

            Ext.MessageBox.confirm(_('Confirm'), String.format(_('Do you really want to delete the {0} "{1}"?'), this.nodeName, nodeName), function(_btn){
                if ( _btn == 'yes') {
                    Ext.MessageBox.wait(_('Please wait'), String.format(_('Deleting {0} "{1}"' ), this.nodeName , nodeName));
                    
                    var params = {
                        method: this.backend + '.delete' + this.backendModel
                    };
                    
                    if (this.backendModel == 'Node') {
                        
                        var filenames = new Array();
                        if(node) {
                            var filenames = [node.attributes.path];
                        }
                        else if(nodes) {
                             for(var i=0; i<nodes.length; i++) {
                                 filenames.push(nodes[i].data.path);
                             }   
                        }
                        params.application = this.scope.app.appName || this.scope.appName;    
                        params.filenames = filenames;
                        params.method = this.backend + ".deleteNodes";
                    
                    } else if (this.backendModel == 'Container') {
                        params.containerId = node.attributes.container.id;
                    } else if (this.backendModel == 'Folder') {
                        var folder = Tine.Tinebase.appMgr.get('Felamimail').getFolderStore().getById(node.attributes.folder_id);
                        params.folder = folder.get('globalname');
                        params.accountId = folder.get('account_id');
                    } else {
                        // use default json api style
                        params.ids = [node.id];
                        params.method = params.method + 's';
                    }
                    
                    Ext.Ajax.request({
                        params: params,
                        scope: this,
                        success: function(_result, _request){
                              
                            if(node) {
                                if(node.isSelected()) {
                                    this.scope.getSelectionModel().select(node.parentNode);
                                    this.scope.fireEvent('click', node.parentNode, Ext.EventObject.setEvent());
                                }
                                node.remove();
                                if (this.backendModel == 'Container' || this.backendModel == 'Node') {
                                    this.scope.fireEvent('containerdelete', node.attributes.container);
                                } else {
                                    this.scope.fireEvent('containerdelete', node.attributes);
                                }
                            }
                            else if(nodes &&  this.backendModel == 'Node') {
                                for(var i=0; i<nodes.length; i++){
                                    this.scope.fireEvent('containerdelete', nodes[i].data.container_id);
                                    
                                    // TODO: in EventHandler auslagern
                                    this.scope.app.getMainScreen().getCenterPanel().getStore().reload();
                                    this.scope.app.getMainScreen().getCenterPanel().currentFolderNode.reload();
                                    
                                }
                            }

                            // TODO: im event auswerten
                            if (this.backendModel == 'Node') {
                                this.scope.app.mainScreen.GridPanel.getStore().reload();
                            }
                            
                            Ext.MessageBox.hide();
                        }
                    });
                }
            }, this);
        }
    },
	
    /**
     * change tree node color
     */
    changeNodeColor: function(cp, color) {
        if (this.scope.ctxNode) {
            var node = this.scope.ctxNode;
            node.getUI().addClass("x-tree-node-loading");
                Ext.Ajax.request({
                    params: {
                        method: this.backend + '.set' + this.backendModel + 'Color',
                        containerId: node.attributes.container.id,
                        color: '#' + color
                    },
                    scope: this,
                    success: function(_result, _request){
                        var nodeData = Ext.util.JSON.decode(_result.responseText);
                        node.getUI().colorNode.setStyle({color: nodeData.color});
                        node.attributes.container.color = nodeData.color;
                        this.scope.fireEvent('containercolorset', nodeData);
                        node.getUI().removeClass("x-tree-node-loading");
                    }
                });
        
        }
    },
    
	/**
     * manage permissions
     * 
     */
    managePermissions: function() {
        console.log(this.scope.ctxNode);
        if (this.scope.ctxNode) {
            var node = this.scope.ctxNode;
            
            var grantContainer = node.attributes.container;
            if(grantContainer.name.id) {
                grantContainer = grantContainer.name;
            }
            
            var window = Tine.widgets.container.GrantsDialog.openWindow({
                title: String.format(_('Manage Permissions for {0} "{1}"'), this.nodeName, Ext.util.Format.htmlEncode(node.attributes.container.name)),
                containerName: this.nodeName,
                grantContainer: grantContainer
            });
        }
    },
    
    /**
     * reload node
     */
    reloadNode: function() {
        if (this.scope.ctxNode) {
            var tree = this.scope;
            this.scope.ctxNode.reload(function(node) {
                node.expand();
                node.select();
                // update grid
                tree.filterPlugin.onFilterChange();
            });                    
        }
    },
    
    /**
     * on pause
     * @param {} button
     * @param {} event
     */
    onPause: function (button, event) {     

        this.scope.action_pause.setDisabled(true);
        this.scope.action_resume.setDisabled(false);
        var gridStore = this.scope.app.getMainScreen().getCenterPanel().store;
        gridStore.suspendEvents();
        var selectedRows = this.scope.selectionModel.getSelections();   
        for(var i=0; i < selectedRows.length; i++) {
            var upload = Tine.Tinebase.uploadManager.getUpload(selectedRows[i].get('uploadKey'));
            upload.setPaused(true);
        }       
        gridStore.resumeEvents();
    },

    
    /**
     * on resume
     * @param {} button
     * @param {} event
     */
    onResume: function (button, event) {
        
        this.scope.action_pause.setDisabled(false);
        this.scope.action_resume.setDisabled(true);
        var gridStore = this.scope.app.getMainScreen().getCenterPanel().store;
        gridStore.suspendEvents();
        var selectedRows = this.scope.selectionModel.getSelections();
        for(var i=0; i < selectedRows.length; i++) {
            var upload = Tine.Tinebase.uploadManager.getUpload(selectedRows[i].get('uploadKey'));
            upload.resumeUpload();
        }
        gridStore.resumeEvents();
    },
    
    getActions: function() {
        
    }
    
    
};
