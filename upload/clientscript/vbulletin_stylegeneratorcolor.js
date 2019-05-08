/*======================================================================*\
|| #################################################################### ||
|| # vBulletin 4.2.5
|| # ---------------------------------------------------------------- # ||
|| # Copyright �2000-2019 vBulletin Solutions Inc. All Rights Reserved. ||
|| # This file may not be redistributed in whole or significant part. # ||
|| # ---------------- VBULLETIN IS NOT FREE SOFTWARE ---------------- # ||
|| #        www.vbulletin.com | www.vbulletin.com/license.html        # ||
|| #################################################################### ||
\*======================================================================*/
function HSV(C,B,A){this.set=function(F,E,D){this.H=F;this.S=E;this.V=D};this.copy=function(){return new HSV(this.H,this.S,this.V)};this.set(C,B,A)}function RGB(C,A,D){this.set=function(F,E,H){this.R=Math.round(F);this.G=Math.round(E);this.B=Math.round(H)};this.copy=function(){return new RGB(this.R,this.G,this.B)};this.toWebCol=function(){this.R=Math.round(this.R/51)*51;this.G=Math.round(this.G/51)*51;this.B=Math.round(this.B/51)*51};this.getCSS=function(){return"rgb("+this.R+","+this.G+","+this.B+")"};this.getHex=function(){return dec2hex(this.R)+dec2hex(this.G)+dec2hex(this.B)};this.set(C,A,D)}var Primary={R:{RGB:new RGB(255,0,0),HSV:new HSV(0,1,1)},RG:{RGB:new RGB(255,255,0),HSV:new HSV(120,1,1)},G:{RGB:new RGB(0,255,0),HSV:new HSV(180,1,0.8)},GB:{RGB:new RGB(0,255,255),HSV:new HSV(210,1,0.6)},B:{RGB:new RGB(0,0,255),HSV:new HSV(255,0.85,0.7)},BR:{RGB:new RGB(255,0,255),HSV:new HSV(315,1,0.65)}};function gInc(B,A,C){return(C==-1)?B:B+(A-B)/(1+C)}function gDec(B,A,C){return(C==-1)?A:A+(B-A)/(1+C)}var ColorWheel={getArc:function(A){if(A<120){return this.RRG}if(A<180){return this.RGG}if(A<210){return this.GGB}if(A<255){return this.GBB}if(A<315){return this.BBR}return this.BRR},RRG:{a:Primary.R,b:Primary.RG,f:function(A){if(A==0){return -1}return Math.tan((120-A)/120*Math.PI/2)*0.5},fi:function(A){if(A==-1){return 0}return 120-Math.atan(A/0.5)*120/Math.PI*2},g:gInc,orderRGB:function(A,B,C){return new RGB(A,B,C)}},RGG:{a:Primary.RG,b:Primary.G,f:function(A){if(A==180){return -1}return Math.tan((A-120)/60*Math.PI/2)*0.5},fi:function(A){if(A==-1){return 180}return 120+Math.atan(A/0.5)*60/Math.PI*2},g:gDec,orderRGB:function(A,B,C){return new RGB(B,A,C)}},GGB:{a:Primary.G,b:Primary.GB,f:function(A){if(A==180){return -1}return Math.tan((210-A)/30*Math.PI/2)*0.75},fi:function(A){if(A==-1){return 180}return 210-Math.atan(A/0.75)*30/Math.PI*2},g:gInc,orderRGB:function(A,B,C){return new RGB(C,A,B)}},GBB:{a:Primary.GB,b:Primary.B,f:function(A){if(A==255){return -1}return Math.tan((A-210)/45*Math.PI/2)*1.33},fi:function(A){if(A==-1){return 255}return 210+Math.atan(A/1.33)*45/Math.PI*2},g:gDec,orderRGB:function(A,B,C){return new RGB(C,B,A)}},BBR:{a:Primary.B,b:Primary.BR,f:function(A){if(A==255){return -1}return Math.tan((315-A)/60*Math.PI/2)*1.33},fi:function(A){if(A==-1){return 255}return 315-Math.atan(A/1.33)*60/Math.PI*2},g:gInc,orderRGB:function(A,B,C){return new RGB(B,C,A)}},BRR:{a:Primary.BR,b:Primary.R,f:function(A){if(A==0){return -1}return Math.tan((A-315)/45*Math.PI/2)*1.33},fi:function(A){if(A==-1){return 0}return 315+Math.atan(A/1.33)*45/Math.PI*2},g:gDec,orderRGB:function(A,B,C){return new RGB(A,C,B)}},getBaseColorByHue:function(E){E=E%360;var D,A,C=this.getArc(E);var B=C.f(E);A=C.g(C.a.HSV.V,C.b.HSV.V,B);D=C.g(C.a.HSV.S,C.b.HSV.S,B);return{HSV:new HSV(E,D,A),RGB:this._getRGB(E,D,A,C,B)}},getRGB:function(E,D,A){var C=this.getArc(E);var B=C.f(E);return this._getRGB(E,D,A,C,B)},_getRGB:function(J,E,C,A,D){var G,I,F,B=A.a.RGB;G=Math.max(B.R,Math.max(B.G,B.B));G=G*C;F=G*(1-E);if(D==-1){I=F}else{I=(G+F*D)/(1+D)}return A.orderRGB(G,I,F)},getColorByRGB:function(F){var J,D,B;if(F.R==F.B&&F.R==F.G){J=0;D=0;B=getLum(F)}else{var G,I,E,A,C;G=Math.max(F.R,Math.max(F.G,F.B));E=Math.min(F.R,Math.min(F.G,F.B));if(G==F.R){if(E==F.B){I=F.G;A=this.RRG}else{I=F.B;A=this.BRR}}else{if(G==F.G){if(E==F.R){I=F.B;A=this.GGB}else{I=F.R;A=this.RGG}}else{if(E==F.R){I=F.G;A=this.GBB}else{I=F.R;A=this.BBR}}}if(I==E){C=-1}else{C=(G-I)/(I-E)}J=A.fi(C);D=(G-E)/G;B=G/255}return new HSV(J,D,B)}};var Model={m1:{getH:function(B,A){return{S1:(B+A)%360,S2:(B-A+360)%360}},minD:5,maxD:360,getD:function(B,A){var C=Math.abs(angleDiff(B,A));return C}}};function angleDiff(C,B){if(B>C){var A=B-C}else{var A=360-(C-B)}return A}var CModel={shadow:[{dS:-0.5,dV:-0.5},{dS:1,dV:-0.7}],light:[{dS:-0.5,dV:1},{dS:-0.9,dV:1}],get:function(D,B){var C,A=[];A.push({dS:this.shadow[0].dS*D,dV:this.shadow[0].dV*D});A.push({dS:this.shadow[1].dS*D,dV:this.shadow[1].dV*D});A.push({dS:this.light[0].dS*B,dV:this.light[0].dV*B});A.push({dS:this.light[1].dS*B,dV:this.light[1].dV*B});return A}};function ColorVar(D,F,B,E,G){this.getVariant=function(M,L,K){function J(N,O){return(O<=0)?N*(O+1):N+(1-N)*O}var I=new HSV(M.H,J(M.S,L),J(M.V,K));var H=ColorWheel.getRGB(I.H,I.S,I.V);return{HSV:I,RGB:H}};this.getOverlayVariant=function(L,K,H){var J=new HSV(L.H,K,H);var I=ColorWheel.getRGB(J.H,J.S,J.V);return{HSV:J,RGB:I}};this.setCol=function(J,I,H){this.Col[J]=this.getVariant(this.Col0.HSV,I,H)};this.getVarHSV=function(H){return this.Col[H].HSV};this.getVarRGB=function(H){return this.Col[H].RGB};this.H=D;this.Base=ColorWheel.getBaseColorByHue(D);this.Col0=this.getVariant(this.Base.HSV,F,B);this.Col=[];if(G[0]){this.Col.push(this.getOverlayVariant(this.Base.HSV,G[0][0],G[0][1]))}else{this.Col.push(this.Col0)}for(var C=0,A=E.length;C<A;C++){if(G[C+1]){this.Col[C+1]=this.getOverlayVariant(this.Base.HSV,G[C+1][0],G[C+1][1])}else{this.Col[C+1]=this.getVariant(this.Col0.HSV,E[C].dS,E[C].dV)}}}var Palette={Scheme:"m1",SchemeModel:Model.m1,H:0,Dist:15,dS:0,dV:0,cS:0.5,cL:0.5,ContrastModel:CModel.get(0.5,0.5),UseVarsOverlay:false,VarsOverlay:[[],[],[],[]],setScheme:function(A){this.Scheme=A;this.SchemeModel=Model[this.Scheme];this.resetVarsOverlay(false);if(this.Sec1){this.setDist(this.Sec1.H)}},setHue:function(A){if(this.H===A){return false}this.H=Math.round(A)%360;this.resetVarsOverlay(false);return true},setHSV:function(A){this.setHue(A.H);var B=this.Primary.Base.HSV;if(B.S==0){this.dS=0}else{if(A.S>B.S){this.dS=(A.S-B.S)/(1-B.S)}else{this.dS=A.S/B.S-1}}if(B.V==0){this.dV=0}else{if(A.V>B.V){this.dV=(A.V-B.V)/(1-B.V)}else{this.dV=A.V/B.V-1}}this.resetVarsOverlay(false)},setDist:function(A){this.Dist=this.SchemeModel.getD(this.H,A);this.resetVarsOverlay(false);return true},setDistNum:function(A){this.Dist=A;this.resetVarsOverlay(false);return true},setSV:function(B,A){this.dS=B;this.dV=A;this.resetVarsOverlay(false)},setContrast:function(B,A){this.UseVarsOverlay=false;this.cS=B;this.cL=A;this.ContrastModel=CModel.get(B,A);this.resetVarsOverlay(false)},resetVarsOverlay:function(A){this.UseVarsOverlay=false;this.VarsOverlay=[[],[],[],[]];if(!A){this.update()}},setVarOverlay:function(C,B,E,D,A){this.UseVarsOverlay=true;this.VarsOverlay[C][B]=[E,D];if(!A){this.update()}},getVarOverlay:function(C,B){var A=this.VarsOverlay[C][B];if(A){return A}var D=this.getColorByIdx(C).Col[B].HSV;return[D.S,D.V]},update:function(A){var B=this.SchemeModel.getH(this.H,this.Dist);if(!A){this.Primary=new ColorVar(this.H,this.dS,this.dV,this.ContrastModel,this.VarsOverlay[0]);this.Compl=B.C==undefined?null:new ColorVar(B.C,this.dS,this.dV,this.ContrastModel,this.VarsOverlay[3])}this.Sec1=B.S1==undefined?null:new ColorVar(B.S1,this.dS,this.dV,this.ContrastModel,this.VarsOverlay[1]);this.Sec2=B.S2==undefined?null:new ColorVar(B.S2,this.dS,this.dV,this.ContrastModel,this.VarsOverlay[2])},serialize:function(){var C="";C+=myB64.encodeInt(this.H,2);C+=this.Scheme.substring(1);C+=myB64.encodeInt(this.Dist+90,2);C+=myB64.encodeFloat((this.dS+1)/2,2);C+=myB64.encodeFloat((this.dV+1)/2,2);C+=myB64.encodeFloat(this.cS,2);C+=myB64.encodeFloat(this.cL,2);if(this.UseVarsOverlay){var B,A;for(B=0;B<4;B++){for(A=0;A<5;A++){if(this.VarsOverlay[B][A]){C+=myB64.encodeInt(8*B+A,1);C+=myB64.encodeFloat((this.VarsOverlay[B][A][0]+1)/2,2);C+=myB64.encodeFloat((this.VarsOverlay[B][A][1]+1)/2,2)}}}}return C},unserialize:function(H){var C,A=[];var F=0;C=H.substring(F,F+2);C=myB64.decodeInt(C);if(C>=0&&C<360){A.push(C)}else{return false}F+=2;C="m"+H.substring(F,F+1);if(Model[C]){A.push(C)}else{return false}F+=1;C=H.substring(F,F+2);C=myB64.decodeInt(C)-90;if(C>=-180&&C<=180){A.push(C)}else{return false}F+=2;C=H.substring(F,F+2);C=myB64.decodeFloat(C,2,5)*2-1;if(C>=-1&&C<=1){A.push(C)}else{return false}F+=2;C=H.substring(F,F+2);C=myB64.decodeFloat(C,2,5)*2-1;if(C>=-1&&C<=1){A.push(C)}else{return false}F+=2;C=H.substring(F,F+2);C=myB64.decodeFloat(C,2,5);if(C>=0&&C<=1){A.push(C)}else{return false}F+=2;C=H.substring(F,F+2);C=myB64.decodeFloat(C,2,5);if(C>=0&&C<=1){A.push(C)}else{return false}F+=2;this.setAll(A[1],A[0],A[2],A[3],A[4],A[5],A[6]);if(H.length>F){var E,D,G,B;while(H.length>F){C=H.substring(F,F+1);C=myB64.decodeInt(C);E=Math.floor(C/8);D=C-E*8;if(E<0||E>3||D<0||D>4){return false}F+=1;C=H.substring(F,F+2);G=myB64.decodeFloat(C,2,5)*2-1;if(G<-1||G>1){return false}F+=2;C=H.substring(F,F+2);B=myB64.decodeFloat(C,2,5)*2-1;if(B<-1||B>1){return false}F+=2;this.setVarOverlay(E,D,G,B,true);push}this.update()}},setAll:function(C,E,G,F,B,D,A){this.Scheme=C;this.SchemeModel=Model[this.Scheme];this.H=E;this.Dist=G;this.dS=F;this.dV=B;this.cS=D;this.cL=A;this.ContrastModel=CModel.get(this.cS,this.cL);this.resetVarsOverlay()},Presets:[{id:"default",name:"Default Scheme",dS:0,dV:0,cS:0.5,cL:0.5}],getPreset:function(C){for(var B=0,A=this.Presets.length;B<A;B++){if(this.Presets[B].id==C){return this.Presets[B]}}return this.Presets[0]},usePreset:function(B){this.resetVarsOverlay();var A=this.getPreset(B);this.setSV(A.dS,A.dV);this.setContrast(A.cS,A.cL)},getColorByIdx:function(B){var A=["Primary","Sec1"];if(!A[B]){B=0}return this[A[B]]}};Palette.update();function dec2hex(C,A){if(!A){A=2}var B=C.toString(16);while(B.length<A){B="0"+B}return B.toUpperCase()}function hex2dec(A){return parseInt(A,16)}function flags2dec(B){var A=0;for(var C=0;C<8;C++){if(B[C]){A|=Math.pow(2,C)}}return A}function dec2flags(C){var A=[];for(var B=0;B<8;B++){A[B]=C&Math.pow(2,B)}return A}function rgb2hex(A){return dec2hex(A.R)+dec2hex(A.G)+dec2hex(A.B)}function getLum(A){return lum=(A.R*0.299+A.G*0.587+A.B*0.114)/255}function col2Gray(B){var A=Math.round(getLum(B)*255);return rgb2hex({R:A,G:A,B:A})}var myB64={_key:"0123456789abcdefghijklmnopqrstuvwxyz.ABCDEFGHIJKLMNOPQRSTUVWXYZ-",_pad:"0000000000000000",encodeInt:function(E,B){var D="",C,A=E;if(!E){D="0"}while(A){C=A&63;D=this._key.charAt(C)+D;A>>=6}if(B){D=this._pad+D;D=D.substring(D.length-B)}return D},decodeInt:function(D){var B,C,E=0;if(!D){return 0}for(var C=0,A=D.length;C<A;C++){E<<=6;B=this._key.indexOf(D.charAt(C));E|=B}return E},encodeFloat:function(B,A){if(!A){A=1}var C=Math.round((Math.pow(64,A)-1)*B);return this.encodeInt(C,A)},decodeFloat:function(D,B,F){var E=this.decodeInt(D);if(!E){return 0}var A=E/(Math.pow(64,B)-1);if(F){var C=Math.pow(10,F);A=Math.round(A*C)/C}return A}};var ColorBlind={getHex:function(A,G,N,L){function E(T,Q,S,R){return Math.round(T-Math.abs((S-R)/51)*(T-Q))}var D=Math.round(A/51)*51;var B=Math.round(G/51)*51;var O=Math.round(N/51)*51;var C=(D<A)?D+51:((D>A)?D-51:D);var P=(B<G)?B+51:((B>G)?B-51:B);var M=(O<N)?O+51:((O>N)?O-51:O);var I=this.colTbl[dec2hex(D)+dec2hex(B)+dec2hex(O)][L];var H=this.colTbl[dec2hex(C)+dec2hex(P)+dec2hex(M)][L];var F=E(hex2dec(I.substring(0,2)),hex2dec(H.substring(0,2)),D,A);var K=E(hex2dec(I.substring(2,4)),hex2dec(H.substring(2,4)),B,G);var J=E(hex2dec(I.substring(4,6)),hex2dec(H.substring(4,6)),O,N);return dec2hex(F)+dec2hex(K)+dec2hex(J)},typeDesc:["Normal vision (85.5 % of population)","Protanopy (1 % of men, 0.02 % of women)","Deuteranopy (1 % of men, 0.1 % of women)","Tritanopy (0.003 % of population)","Protanomaly (1 % of men, 0.01% of women)","Deuteranomaly (5 % of men, 0.4 % of women)","Tritanomaly (0.01 % of population)","Full colorblindness (0.005 % of population)","Atypical monochromatism (0.005 % of population)"],colTbl:{FFFFFF:["FFFFFF","FFFAFA","FFE8EF","F4F0FF","FFFCFC","FFF3F7","F9F7FF","FFFFFF","FFFFFF"],FFFFCC:["FFFFCC","FFF2C8","FFDFC8","FDEFFF","FFF8CA","FFEFCA","FEF7E5","EEEEEE","F1F1E7"],FFFF99:["FFFF99","FFEDA2","FFDAAD","FFEAF9","FFF69D","FFECA3","FFF4C9","DDDDDD","E3E3CF"],FFFF66:["FFFF66","FFEA86","FFD79D","FFE6F5","FFF476","FFEB81","FFF2AD","CCCCCC","D6D6B7"],FFFF33:["FFFF33","FFE975","FFD594","FFE5F3","FFF454","FFEA63","FFF293","BBBBBB","C8C89F"],FFFF00:["FFFF00","FFE871","FFD592","FFE4F2","FFF338","FFEA49","FFF179","AAAAAA","BBBB88"],FFCCFF:["FFCCFF","CFD7FF","E1D8FD","FBD1E1","E7D1FF","F0D2FE","FDCEF0","EEEEEE","F1E7F1"],FFCCCC:["FFCCCC","DED8D2","F1D2CB","FFCAD8","EED2CF","F8CFCB","FFCBD2","DDDDDD","E3D9D9"],FFCC99:["FFCC99","E5D69D","FCCD99","FFC4D1","F2D19B","FDCC99","FFC8B5","CCCCCC","D6CCC1"],FFCC66:["FFCC66","E9D469","FFCA6F","FFC0CD","F4D067","FFCB6A","FFC699","BBBBBB","C8BEAA"],FFCC33:["FFCC33","ECD435","FFC857","FFBFCA","F5D034","FFCA45","FFC57E","AAAAAA","BBB092"],FFCC00:["FFCC00","ECD30F","FFC750","FFBECA","F5CF07","FFC928","FFC565","999999","ADA37A"],FF99FF:["FF99FF","AABDFF","B0BCF9","F6A9B5","D4ABFF","D7AAFC","FAA1DA","DDDDDD","E3CFE3"],FF99CC:["FF99CC","B1B8E0","C5B5C7","FC9FAA","D8A8D6","E2A7C9","FD9CBB","CCCCCC","D6C1CC"],FF9999:["FF9999","BDB6A8","D2B095","FF99A2","DEA7A0","E8A497","FF999D","BBBBBB","C8B4B4"],FF9966:["FF9966","C4B470","DAAC62","FF959E","E1A66B","ECA264","FF9782","AAAAAA","BBA69C"],FF9933:["FF9933","C7B43A","DEAB2A","FF949D","E3A636","EEA22E","FF9668","999999","AD9984"],FF9900:["FF9900","C8B317","DFAA00","FF949C","E3A60B","EFA100","FF964E","888888","9F8B6C"],FF66FF:["FF66FF","98B2FF","85A7F5","F28791","CB8CFF","C286FA","F876C8","CCCCCC","D6B7D6"],FF66CC:["FF66CC","82A0F6","A09FC3","F87981","C083E1","CF82C7","FB6FA6","BBBBBB","C8AABE"],FF6699:["FF6699","999DB9","B19992","FD6E74","CC81A9","D87F95","FE6A86","AAAAAA","BB9CA6"],FF6666:["FF6666","A59B7C","BB955E","FF666C","D28071","DD7D62","FF6669","999999","AD8E8E"],FF6633:["FF6633","AA9A42","BF9322","FF656A","D4803A","DF7C2A","FF654E","888888","9F8177"],FF6600:["FF6600","AC9A1E","C09300","FF6569","D5800F","DF7C00","FF6534","777777","92735F"],FF33FF:["FF33FF","96B1FF","679BF2","F07178","CA72FF","B367F8","F752BB","BBBBBB","C89FC8"],FF33CC:["FF33CC","779DFF","8A92C1","F75E63","BB68E5","C462C6","FB4897","AAAAAA","BB92B0"],FF3399:["FF3399","7A8ECE","9D8B8F","FB4C4F","BC60B3","CE5F94","FD3F74","999999","AD8499"],FF3366:["FF3366","8F8C8B","A7875C","FE3D3E","C75F78","D35D61","FE3852","888888","9F7781"],FF3333:["FF3333","988B4A","AD841C","FF3332","CB5F3E","D65B27","FF3332","777777","926969"],FF3300:["FF3300","9A8B23","AE8600","FF3331","CC5F11","D65C00","FF3318","666666","845B51"],FF00FF:["FF00FF","96B1FF","5E98F1","F06A71","CA58FF","AE4CF8","F735B8","AAAAAA","BB88BB"],FF00CC:["FF00CC","7BA0FF","838FC0","F6555A","BD50E5","C147C6","FA2A93","999999","AD7AA3"],FF0099:["FF0099","6E89D7","97888E","FA4042","B644B8","CB4493","FC206D","888888","9F6C8B"],FF0066:["FF0066","888892","A2835B","FD2B28","C3447C","D04160","FE1547","777777","925F73"],FF0033:["FF0033","93874E","A8801A","FE1A00","C94340","D34026","FE0D19","666666","84515B"],FF0000:["FF0000","968726","A98200","FE1C00","CA4313","D44100","FE0E00","555555","774444"],CCFFFF:["CCFFFF","F8F4F8","FFEAFD","CBEFFF","E2F9FB","E5F4FE","CBF7FF","EEEEEE","E7F1F1"],CCFFCC:["CCFFCC","FFF1C5","FFDECC","D3EFFF","E5F8C8","E5EECC","CFF7E5","DDDDDD","D9E3D9"],CCFF99:["CCFF99","FFEB97","FFD8AB","D9EEFF","E5F598","E5EBA2","D2F6CC","CCCCCC","CCD6C1"],CCFF66:["CCFF66","FFE873","FFD497","DDEEFF","E5F36C","E5E97E","D4F6B2","BBBBBB","BEC8AA"],CCFF33:["CCFF33","FFE75C","FFD38C","E0EEFF","E5F347","E5E95F","D6F699","AAAAAA","B0BB92"],CCFF00:["CCFF00","FFE655","FFD389","E0EEFF","E5F22A","E5E944","D6F67F","999999","A3AD7A"],CCCCFF:["CCCCFF","C4CEFF","CBCCFF","C6D1E1","C8CDFF","CBCCFF","C9CEF0","DDDDDD","D9D9E3"],CCCCCC:["CCCCCC","CFCBCB","DEC6CD","CECAD9","CDCBCB","D5C9CC","CDCBD2","CCCCCC","CCCCCC"],CCCC99:["CCCC99","D7C997","EAC19B","D3C4D3","D1CA98","DBC69A","CFC8B6","BBBBBB","BEBEB4"],CCCC66:["CCCC66","DBC764","F1BE6A","D7C1CF","D3C965","DEC568","D1C69A","AAAAAA","B0B09C"],CCCC33:["CCCC33","DDC631","F5BC3B","D8BFCD","D4C932","E0C437","D2C580","999999","A3A384"],CCCC00:["CCCC00","DDC600","F6C600","D9BECC","D4C900","E1C900","D2C566","888888","95956C"],CC99FF:["CC99FF","98B1FF","8FAEFB","BFA9B6","B2A5FF","ADA3FD","C5A1DA","CCCCCC","CCC1D6"],CC99CC:["CC99CC","9EA8D7","AAA7C9","C79FAB","B5A0D1","BBA0CA","C99CBB","BBBBBB","BEB4BE"],CC9999:["CC9999","AAA5A0","BAA198","CD98A2","BB9F9C","C39D98","CC989D","AAAAAA","B0A6A6"],CC9966:["CC9966","B1A46A","C49D65","D0929D","BE9E68","C89B65","CE9581","999999","A3998E"],CC9933:["CC9933","B5A336","C99B32","D2909A","C09E34","CA9A32","CF9466","888888","958B77"],CC9900:["CC9900","B5A20E","CA9A00","D38F99","C09D07","CB9900","CF944C","777777","887D5F"],CC66FF:["CC66FF","87A7FF","4C97F6","BB8791","A986FF","8C7EFA","C376C8","BBBBBB","BEAAC8"],CC66CC:["CC66CC","648CEB","7B8DC5","C37982","9879DB","A379C8","C76FA7","AAAAAA","B09CB0"],CC6699:["CC6699","7F88AF","918694","C96E75","A577A4","AE7696","CA6A87","999999","A38E99"],CC6666:["CC6666","8C8675","9E8161","CC656C","AC766D","B57363","CC6569","888888","958181"],CC6633:["CC6633","92853C","A47E2B","CE6067","AF7537","B8722F","CD634D","777777","887369"],CC6600:["CC6600","948415","A67F00","CF5F65","B0750A","B97200","CD6232","666666","7A6651"],CC33FF:["CC33FF","8AAAFF","008DEF","B87178","AB6EFF","6660F7","C252BB","AAAAAA","B092BB"],CC33CC:["CC33CC","4387FF","577EC2","C15E64","875DE5","9158C7","C64898","999999","A384A3"],CC3399:["CC3399","5275C8","767591","C64C50","8F54B0","A15495","C93F74","888888","95778B"],CC3366:["CC3366","707387","856F5F","CA3D3F","9E5376","A85162","CB3852","777777","886973"],CC3333:["CC3333","7B7146","8C6C27","CC3334","A3523C","AC4F2D","CC3333","666666","7A5B5B"],CC3300:["CC3300","7E711B","8F6D00","CC3030","A5520D","AD5000","CC3118","555555","6C4E44"],CC00FF:["CC00FF","8CABFF","008CEC","B76A71","AC55FF","6646F5","C135B8","999999","A37AAD"],CC00CC:["CC00CC","5D91FF","4B7AC0","C0555A","9448E5","8B3DC6","C62A93","888888","956C95"],CC0099:["CC0099","356FD5","6E7190","C64043","8037B7","9D3894","C9206E","777777","885F7D"],CC0066:["CC0066","646D90","7E6A5E","CA2B2B","98367B","A53562","CB1548","666666","7A5166"],CC0033:["CC0033","746C4C","856726","CB170B","A0363F","A8332C","CB0B1F","555555","6C444E"],CC0000:["CC0000","786C1E","886900","CC1600","A2360F","AA3400","CC0B00","444444","5F3636"],"99FFFF":["99FFFF","EFECF4","F4E4FF","A6EFFF","C4F5F9","C6F1FF","9FF7FF","DDDDDD","CFE3E3"],"99FFCC":["99FFCC","F7E9C1","FFDDD0","ACEFFF","C8F4C6","CCEECE","A2F7E5","CCCCCC","C1D6CC"],"99FF99":["99FF99","FBE790","FFD6A9","B0EEFF","CAF394","CCEAA1","A4F6CC","BBBBBB","B4C8B4"],"99FF66":["99FF66","FEE65E","FFD291","B4EEFF","CBF262","CCE87B","A6F6B2","AAAAAA","A6BB9C"],"99FF33":["99FF33","FFE532","FFD184","B5EDFF","CCF232","CCE85B","A7F699","999999","99AD84"],"99FF00":["99FF00","FFE41C","FFD080","B6EDFF","CCF10E","CCE740","A7F67F","888888","8B9F6C"],"99CCFF":["99CCFF","B9C5FA","B9C4FF","91D1E1","A9C8FC","A9C8FF","95CEF0","CCCCCC","C1CCD6"],"99CCCC":["99CCCC","C4C1C6","CEBDCF","9CCAD9","AEC6C9","B3C4CD","9ACBD2","BBBBBB","B4BEBE"],"99CC99":["99CC99","CBBF93","DBB89D","A3C4D3","B2C596","BAC29B","9EC8B6","AAAAAA","A6B0A6"],"99CC66":["99CC66","CFBD61","E4B56C","A8C1CF","B4C463","BEC069","A0C69A","999999","99A38E"],"99CC33":["99CC33","D1BC2F","E8B33F","AABFCD","B5C431","C0BF39","A1C580","888888","8B9577"],"99CC00":["99CC00","D2BC00","E9B22A","ABBECD","B5C400","C1BF15","A2C566","777777","7D885F"],"9999FF":["9999FF","83A4FF","6FA4FD","86A9B6","8E9EFF","849EFE","8FA1DA","BBBBBB","B4B4C8"],"9999CC":["9999CC","8F9CCE","929BCC","929FAB","949ACD","959ACC","959CBB","AAAAAA","A6A6B0"],"999999":["999999","9B9899","A6949A","9A97A3","9A9899","9F9699","99989E","999999","999999"],"999966":["999966","A29665","B29068","9F929D","9D9765","A59467","9C9581","888888","8B8B81"],"999933":["999933","A59532","B78E37","A2909A","9F9732","A89335","9D9466","777777","7D7D69"],"999900":["999900","A69500","A69500","A28F99","9F9700","9F9700","9D944C","666666","707051"],"9966FF":["9966FF","709BFF","0090F3","7E8791","8480FF","4C7BF9","8B76C8","AAAAAA","A69CBB"],"9966CC":["9966CC","497BDF","507FC7","8C7982","7170D5","7472C9","926FA7","999999","998EA3"],"996699":["996699","6A77A5","737696","946D75","816E9F","866E97","966987","888888","8B818B"],"996666":["996666","78746D","847064","9A656C","886D69","8E6B65","996569","777777","7D7373"],"996633":["996633","7E7237","8C6D31","9C6067","8B6C35","926932","9A634D","666666","70665B"],"996600":["996600","7F720D","8E6C00","9D5F66","8C6C06","936900","9B6233","555555","625844"],"9933FF":["9933FF","7DA2FF","008DE8","7A7078","8B6AFF","4C60F3","8951BB","999999","9984AD"],"9933CC":["9933CC","007AF6","0073C2","885D64","4C56E1","4C53C7","904898","888888","8B7795"],"993399":["993399","005EBF","496192","914C51","4C48AC","714A95","953F75","777777","7D697D"],"993366":["993366","505B80","625961","963D40","744773","7D4663","973853","666666","705B66"],"993333":["993333","5F5941","6C552D","993335","7C463A","824430","993334","555555","624E4E"],"993300":["993300","635913","705600","9A3032","7E4609","844400","993119","444444","554036"],"9900FF":["9900FF","83A6FF","008CE5","796A71","8E53FF","4C46F2","8935B8","888888","8B6C9F"],"9900CC":["9900CC","2782FF","0073C0","87555B","6041E5","4C39C6","902A93","777777","7D5F88"],"990099":["990099","0067D0","385B90","904044","4C33B4","682D94","94206E","666666","705170"],"990066":["990066","39538F","57535F","962B2C","69297A","782962","971549","555555","624458"],"990033":["990033","55514A","634E2C","981612","77283E","7E272F","980B22","444444","553640"],"990000":["990000","5A5117","674F00","991100","79280B","802700","990800","333333","472828"],"66FFFF":["66FFFF","EAE7F0","EBDFFF","88EFFF","A8F3F7","A8EFFF","77F7FF","CCCCCC","B7D6D6"],"66FFCC":["66FFCC","F1E4BF","FFDDD3","8BEFFF","ABF1C5","B2EECF","78F7E5","BBBBBB","AAC8BE"],"66FF99":["66FF99","F6E28D","FFD5A7","8EEEFF","AEF093","B2EAA0","7AF6CC","AAAAAA","9CBBA6"],"66FF66":["66FF66","F8E15D","FFD08B","90EEFF","AFF061","B2E778","7BF6B2","999999","8EAD8E"],"66FF33":["66FF33","FAE02A","FFCF7C","92EDFF","B0EF2E","B2E757","7CF699","888888","819F77"],"66FF00":["66FF00","FAE000","FFCE79","92EDFF","B0EF00","B2E63C","7CF67F","777777","73925F"],"66CCFF":["66CCFF","B2BEF5","ADBEFF","57D1E1","8CC5FA","89C5FF","5ECEF0","BBBBBB","AABEC8"],"66CCCC":["66CCCC","BDBBC1","C3B7D1","6BCAD9","91C3C6","94C1CE","68CBD2","AAAAAA","9CB0B0"],"66CC99":["66CC99","C4B88F","D2B29F","77C4D3","95C294","9CBF9C","6EC8B6","999999","8EA399"],"66CC66":["66CC66","C8B65E","DAAE6E","7EC1CF","97C162","A0BD6A","72C69A","888888","819581"],"66CC33":["66CC33","CAB52D","DFAC42","81BFCD","98C030","A2BC3A","73C580","777777","738869"],"66CC00":["66CC00","CAB500","E0AC2E","82BECD","98C000","A3BC17","74C566","666666","667A51"],"6699FF":["6699FF","6E98FE","519CFE","3EA9B6","6A98FE","5B9AFE","52A1DA","AAAAAA","9CA6BB"],"6699CC":["6699CC","8593C7","8093CD","5A9FAB","7596C9","7396CC","609CBB","999999","8E99A3"],"669999":["669999","918F93","978C9C","6997A3","7B9496","7E929A","67989E","888888","818B8B"],"669966":["669966","988C61","A4876A","71929D","7F9263","859068","6B9581","777777","737D73"],"669933":["669933","9B8B2F","AA853B","74909A","809231","888F37","6D9466","666666","66705B"],"669900":["669900","9B8B00","AC8421","758F9A","809200","898E10","6D944D","555555","586244"],"6666FF":["6666FF","518DFF","0090EE","228791","5B79FF","337BF6","4476C8","999999","8E8EAD"],"6666CC":["6666CC","326ED5","0076C9","4D7982","4C6AD0","336ECA","596FA7","888888","818195"],"666699":["666699","59699C","586A98","5E6D75","5F679A","5F6898","626987","777777","73737D"],"666666":["666666","686666","6F6367","67656C","676666","6A6466","666569","666666","666666"],"666633":["666633","6D6432","795F35","6B6067","696532","6F6234","68634D","555555","58584E"],"666600":["666600","6F6300","7B5E11","6C5F66","6A6400","706208","696233","444444","4A4A36"],"6633FF":["6633FF","6E9AFF","008CE4","007179","6A66FF","335FF1","3352BC","888888","81779F"],"6633CC":["6633CC","0074EA","0076C2","445D64","3353DB","3354C7","554898","777777","736988"],"663399":["663399","0059B4","005995","584C51","3346A6","334697","5F3F75","666666","665B70"],"663366":["663366","324676","3D4763","623D41","4C3C6E","513D64","643853","555555","584E58"],"663333":["663333","46433A","4F4031","663336","563B36","5A3932","663334","444444","4A4040"],"663300":["663300","4A420B","534000","673033","583A05","5C3900","663119","333333","3D3328"],"6600FF":["6600FF","7AA1FF","008BE1","006B73","7050FF","3345F0","3335B9","777777","735F92"],"6600CC":["6600CC","007CF8","0076BF","42545B","333EE2","333BC5","542A93","666666","66517A"],"660099":["660099","0065CA","005A94","563F44","3332B1","332D96","5E1F6E","555555","584462"],"660066":["660066","00478E","253D60","602B2D","33237A","451E63","631549","444444","4A364A"],"660033":["660033","323748","3F352F","651615","4C1B3D","521A31","650B24","333333","3D2833"],"660000":["660000","3C360F","453500","660B00","511B07","551A00","660500","222222","2F1B1B"],"33FFFF":["33FFFF","E7E5EF","E7DDFF","74EFFF","8DF2F7","8DEEFF","53F7FF","BBBBBB","9FC8C8"],"33FFCC":["33FFCC","EEE2BD","FCDBD4","76EFFF","90F0C4","97EDD0","54F7E5","AAAAAA","92BBB0"],"33FF99":["33FF99","F3DF8C","FFD4A6","78EEFF","93EF92","99E99F","55F6CC","999999","84AD99"],"33FF66":["33FF66","F5DE5C","FFCF88","79EEFF","94EE61","99E777","56F6B2","888888","779F81"],"33FF33":["33FF33","F7DD29","FFCD78","7AEDFF","95EE2E","99E655","56F699","777777","699269"],"33FF00":["33FF00","F7DD00","FFCD74","7AEDFF","95EE00","99E63A","56F67F","666666","5B8451"],"33CCFF":["33CCFF","AEBBF2","A7BBFF","00D1E0","70C3F8","6DC3FF","19CEEF","AAAAAA","92B0BB"],"33CCCC":["33CCCC","B9B7BF","BDB4D1","3ECAD9","76C1C5","78C0CE","38CBD2","999999","84A3A3"],"33CC99":["33CC99","C0B48E","CCAEA0","54C4D3","79C093","7FBD9C","43C8B6","888888","77958B"],"33CC66":["33CC66","C4B25D","D6AB6F","5EC1CF","7BBF61","84BB6A","48C69A","777777","698873"],"33CC33":["33CC33","C6B22C","DAA943","63BFCD","7CBF2F","86BA3B","4BC580","666666","5B7A5B"],"33CC00":["33CC00","C6B100","DBA830","64BFD7","7CBE00","87BA18","4BC56B","555555","4E6C44"],"3399FF":["3399FF","6993FA","3999FF","00ABB7","4E96FC","3699FF","19A2DB","999999","8499AD"],"3399CC":["3399CC","7F8EC3","758FCE","00A0AC","5993C7","5494CD","199CBC","888888","778B95"],"339999":["339999","8C8A90","8F879D","3997A3","5F9194","61909B","36989E","777777","697D7D"],"339966":["339966","92875E","9D826B","49929D","629062","688D68","3E9581","666666","5B7066"],"339933":["339933","95862E","A4803C","4F909A","648F30","6B8C37","419466","555555","4E624E"],"339900":["339900","958600","A58600","518F9A","648F00","6C8F00","42944D","444444","405536"],"3366FF":["3366FF","2581FF","0090EC","009099","2C73FF","197BF5","197BCC","888888","77819F"],"3366CC":["3366CC","2067CD","0078C9","007F87","2966CC","196FCA","1972A9","777777","697388"],"336699":["336699","506195","43639A","146D76","416397","3B6499","236987","666666","5B6670"],"336666":["336666","5E5D61","615B68","35656D","486163","4A6067","346569","555555","4E5858"],"336633":["336633","645B2F","6D5737","3F6068","4B6031","505E35","39634D","444444","404A40"],"336600":["336600","655B00","705617","415F66","4C6000","515E0B","3A6233","333333","333D28"],"3333FF":["3333FF","6094FF","008CE2","008187","4963FF","195FF0","195AC3","777777","696992"],"3333CC":["3333CC","0070E1","0078C2","006A70","1951D6","1955C7","194E9E","666666","5B5B7A"],"333399":["333399","0054AA","005D99","005056","1943A1","194899","194177","555555","4E4E62"],"333366":["333366","19376A","003B65","263C41","263568","193765","2C3753","444444","40404A"],"333333":["333333","343333","373133","333236","333333","353233","333234","333333","333333"],"333300":["333300","373200","3D2F09","363033","353200","383104","343119","222222","25251B"],"3300FF":["3300FF","739DFF","008BDF","007C82","534EFF","1945EF","193EC0","666666","5B5184"],"3300CC":["3300CC","0079F2","0076BF","006469","193CDF","193BC5","19329A","555555","4E446C"],"330099":["330099","0062C4","005D96","00474B","1931AE","192E97","192372","444444","403655"],"330066":["330066","00468B","003F67","212A2D","192378","191F66","2A1549","333333","33283D"],"330033":["330033","002448","131E30","301517","19123D","230F31","310A25","222222","251B25"],"330000":["330000","1E1B08","221A00","330600","280D04","2A0D00","330300","111111","170D0D"],"00FFFF":["00FFFF","E6E4EE","E6DCFF","6EEFFF","73F1F6","73EDFF","37F7FF","AAAAAA","88BBBB"],"00FFCC":["00FFCC","EDE1BD","FBDAD4","70EFFF","76F0C4","7DECD0","38F7E5","999999","7AADA3"],"00FF99":["00FF99","F2DF8C","FFD3A6","72EEFF","79EF92","7FE99F","39F6CC","888888","6C9F8B"],"00FF66":["00FF66","F5DD5C","FFCF87","73EEFF","7AEE61","7FE776","39F6B2","777777","5F9273"],"00FF33":["00FF33","F6DD29","FFCD77","73EDFF","7BEE2E","7FE655","39F699","666666","51845B"],"00FF00":["00FF00","F6DC00","FFCD72","73EDFF","7BED00","7FE639","39F67F","555555","447744"],"00CCFF":["00CCFF","ADBAF2","A5BBFF","00D0DF","56C3F8","52C3FF","00CEEF","999999","7AA3AD"],"00CCCC":["00CCCC","B8B6BF","BBB3D1","29CAD9","5CC1C5","5DBFCE","14CBD2","888888","6C9595"],"00CC99":["00CC99","BFB38D","CBAEA0","47C4D3","5FBF93","65BD9C","23C8B6","777777","5F887D"],"00CC66":["00CC66","C3B25D","D4AA6F","54C1CF","61BF61","6ABB6A","2AC69A","666666","517A66"],"00CC33":["00CC33","C5B12B","D9A844","59BFCD","62BE2F","6CBA3B","2CC580","555555","446C4E"],"00CC00":["00CC00","C5B000","DAA831","5ABFCD","62BE00","6DBA18","2DC566","444444","365F36"],"0099FF":["0099FF","6792F8","3398FF","00ACB7","3395FB","1998FF","00A2DB","888888","6C8B9F"],"0099CC":["0099CC","7E8DC2","728ECF","00A1AC","3F93C7","3993CD","009DBC","777777","5F7D88"],"009999":["009999","8A898F","8D869D","1F97A3","459194","468F9B","0F989E","666666","517070"],"009966":["009966","90865E","9B816C","39929D","488F62","4D8D69","1C9581","555555","446258"],"009933":["009933","93852D","A27E3D","42909A","498F30","518B38","219466","444444","365540"],"009900":["009900","948500","A37E25","448F9A","4A8F00","518B12","22944D","333333","284728"],"0066FF":["0066FF","007EFE","0090EC","00929A","0072FE","007BF5","007CCC","777777","5F7392"],"0066CC":["0066CC","1A66CC","0078C9","00828A","0D66CC","006FCA","0074AB","666666","51667A"],"006699":["006699","4E5F93","3D629A","00727A","276296","1E6499","006C89","555555","445862"],"006666":["006666","5C5B5F","5E5A69","15656D","2E6062","2F6067","0A6569","444444","364A4A"],"006633":["006633","61592E","6A5538","2A6068","305F30","355D35","15634D","333333","283D33"],"006600":["006600","635800","6D5418","2D5F66","315F00","365D0C","166233","222222","1B2F1B"],"0033FF":["0033FF","5B91FF","008CE2","008389","2D62FF","005FF0","005BC4","666666","515B84"],"0033CC":["0033CC","006FDE","0078C2","006F74","0051D5","0055C7","0051A0","555555","444E6C"],"003399":["003399","0053A6","005E9A","00595E","00439F","004899","00467B","444444","364055"],"003366":["003366","0D3366","003E68","004347","063366","003867","003B56","333333","28333D"],"003333":["003333","2E2E30","2F2D34","0A3236","173031","173033","053234","222222","1B2525"],"003300":["003300","312C00","362A0C","173033","182F00","1B2E06","0B3119","111111","0D170D"],"0000FF":["0000FF","719CFF","008BDF","007F85","384EFF","0045EF","003FC2","555555","444477"],"0000CC":["0000CC","0078F0","0076BE","006A6E","003CDE","003BC5","00359D","444444","36365F"],"000099":["000099","0060C1","005E97","005155","0030AD","002F98","002877","333333","282847"],"000066":["000066","004487","004168","003739","002276","002067","001B4F","222222","1B1B2F"],"000033":["000033","002346","002135","001C1D","00113C","001034","000E28","111111","0D0D17"],"000000":["000000","000000","000000","000000","000000","000000","000000","000000","000000"]}};