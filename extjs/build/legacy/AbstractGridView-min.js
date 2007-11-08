/*
 * Ext JS Library 2.0 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.grid.AbstractGridView=function(){this.grid=null;this.events={"beforerowremoved":true,"beforerowsinserted":true,"beforerefresh":true,"rowremoved":true,"rowsinserted":true,"rowupdated":true,"refresh":true};Ext.grid.AbstractGridView.superclass.constructor.call(this)};Ext.extend(Ext.grid.AbstractGridView,Ext.util.Observable,{rowClass:"x-grid-row",cellClass:"x-grid-cell",tdClass:"x-grid-td",hdClass:"x-grid-hd",splitClass:"x-grid-hd-split",init:function(A){this.grid=A;var B=this.grid.getGridEl().id;this.colSelector="#"+B+" ."+this.cellClass+"-";this.tdSelector="#"+B+" ."+this.tdClass+"-";this.hdSelector="#"+B+" ."+this.hdClass+"-";this.splitSelector="#"+B+" ."+this.splitClass+"-"},getColumnRenderers:function(){var B=[];var A=this.grid.colModel;var D=A.getColumnCount();for(var C=0;C<D;C++){B[C]=A.getRenderer(C)}return B},getColumnIds:function(){var C=[];var A=this.grid.colModel;var D=A.getColumnCount();for(var B=0;B<D;B++){C[B]=A.getColumnId(B)}return C},getDataIndexes:function(){if(!this.indexMap){this.indexMap=this.buildIndexMap()}return this.indexMap.colToData},getColumnIndexByDataIndex:function(A){if(!this.indexMap){this.indexMap=this.buildIndexMap()}return this.indexMap.dataToCol[A]},setCSSStyle:function(C,B,D){var A="#"+this.grid.id+" .x-grid-col-"+C;Ext.util.CSS.updateRule(A,B,D)},generateRules:function(B){var C=[];for(var D=0,A=B.getColumnCount();D<A;D++){var E=B.getColumnId(D);C.push(this.colSelector,E," {\n",B.config[D].css,"}\n",this.tdSelector,E," {\n}\n",this.hdSelector,E," {\n}\n",this.splitSelector,E," {\n}\n")}return Ext.util.CSS.createStyleSheet(C.join(""))}});