/**
 * Created by slivinskas on 2017-03-11.
 */
var R320_240=8;
var R640_480=32;
var ptz_type=0;
var PTZ_STOP=1;
var TILT_UP=0;
var TILT_UP_STOP=1;
var TILT_DOWN=2;
var TILT_DOWN_STOP=3;
var PAN_LEFT=4;
var PAN_LEFT_STOP=5;
var PAN_RIGHT=6;
var PAN_RIGHT_STOP=7;
var PTZ_LEFT_UP=90;
var PTZ_RIGHT_UP=91;
var PTZ_LEFT_DOWN=92;
var PTZ_RIGHT_DOWN=93;
var PTZ_CENTER=25;
var PTZ_VPATROL=26;
var PTZ_VPATROL_STOP=27;
var PTZ_HPATROL=28;
var PTZ_HPATROL_STOP=29;
var PTZ_PELCO_D_HPATROL=20;
var PTZ_PELCO_D_HPATROL_STOP=21;
var IO_ON=94;
var IO_OFF=95;
function decoder_control(command)
{
    action_zone.location='decoder_control.cgi?command='+command;
}
function camera_control(param,value)
{
    action_zone.location='camera_control.cgi?param='+param+'&value='+value;
}
function set_flip()
{
    if (image_reversal.checked)
        flip|=1;
    else
        flip&=2;
    if (image_mirror.checked)
        flip|=2;
    else
        flip&=1;
    camera_control(5,flip);
}
function up_onmousedown()
{
    (flip&0x01)?decoder_control(TILT_DOWN):decoder_control(TILT_UP);
}
function up_onmouseup()
{
    if (!ptz_type)
        decoder_control(PTZ_STOP);
    else if (flip&0x01)
        decoder_control(TILT_DOWN_STOP);
    else
        decoder_control(TILT_UP_STOP);
}
function down_onmousedown()
{
    (flip&0x01)?decoder_control(TILT_UP):decoder_control(TILT_DOWN);
}
function down_onmouseup()
{
    if (!ptz_type)
        decoder_control(PTZ_STOP);
    else if (flip&0x01)
        decoder_control(TILT_UP_STOP);
    else
        decoder_control(TILT_DOWN_STOP);
}
function left_onmousedown()
{
    (flip&0x02)?decoder_control(PAN_RIGHT):decoder_control(PAN_LEFT);
}
function left_onmouseup()
{
    if (!ptz_type)
        decoder_control(PTZ_STOP);
    else if (flip&0x02)
        decoder_control(PAN_RIGHT_STOP);
    else
        decoder_control(PAN_LEFT_STOP);
}
function right_onmousedown()
{
    (flip&0x02)?decoder_control(PAN_LEFT):decoder_control(PAN_RIGHT);
}
function right_onmouseup()
{
    if (!ptz_type)
        decoder_control(PTZ_STOP);
    else if (flip&0x02)
        decoder_control(PAN_LEFT_STOP);
    else
        decoder_control(PAN_RIGHT_STOP);
}
function leftup_onmousedown()
{
    if (ptz_type)
        return;
    if ((flip&0x03)==0x03)
        decoder_control(PTZ_RIGHT_DOWN);
    else if (flip&0x02)
        decoder_control(PTZ_RIGHT_UP);
    else if (flip&0x01)
        decoder_control(PTZ_LEFT_DOWN);
    else
        decoder_control(PTZ_LEFT_UP);
}
function leftup_onmouseup()
{
    if (!ptz_type) decoder_control(PTZ_STOP);
}
function rightup_onmousedown()
{
    if (ptz_type)
        return;
    if ((flip&0x03)==0x03)
        decoder_control(PTZ_LEFT_DOWN);
    else if (flip&0x02)
        decoder_control(PTZ_LEFT_UP);
    else if (flip&0x01)
        decoder_control(PTZ_RIGHT_DOWN);
    else
        decoder_control(PTZ_RIGHT_UP);
}
function rightup_onmouseup()
{
    if (!ptz_type) decoder_control(PTZ_STOP);
}
function leftdown_onmousedown()
{
    if (ptz_type)
        return;
    if ((flip&0x03)==0x03)
        decoder_control(PTZ_RIGHT_UP);
    else if (flip&0x02)
        decoder_control(PTZ_RIGHT_DOWN);
    else if (flip&0x01)
        decoder_control(PTZ_LEFT_UP);
    else
        decoder_control(PTZ_LEFT_DOWN);
}
function leftdown_onmouseup()
{
    if (!ptz_type) decoder_control(PTZ_STOP);
}
function rightdown_onmousedown()
{
    if (ptz_type)
        return;
    if ((flip&0x03)==0x03)
        decoder_control(PTZ_LEFT_UP);
    else if (flip&0x02)
        decoder_control(PTZ_LEFT_DOWN);
    else if (flip&0x01)
        decoder_control(PTZ_RIGHT_UP);
    else
        decoder_control(PTZ_RIGHT_DOWN);
}
function rightdown_onmouseup()
{
    if (!ptz_type) decoder_control(PTZ_STOP);
}
function center_onclick()
{
    if (!ptz_type) decoder_control(PTZ_CENTER);
}
function vpatrol_onclick()
{
    if (!ptz_type) decoder_control(PTZ_VPATROL);
}
function vpatrolstop_onclick()
{
    if (!ptz_type) decoder_control(PTZ_VPATROL_STOP);
}
function hpatrol_onclick()
{
    ptz_type?decoder_control(PTZ_PELCO_D_HPATROL):decoder_control(PTZ_HPATROL);
}
function hpatrolstop_onclick()
{
    ptz_type?decoder_control(PTZ_PELCO_D_HPATROL_STOP):decoder_control(PTZ_HPATROL_STOP);
}
function set_resolution()
{
    camera_control(0,resolution_sel.value);
    setTimeout('parent.parent.main.location.reload()',2000);
}
function plus_brightness()
{
    val=brightness_input.value;
    if (val++<15)
    {
        brightness_input.value=val;
        camera_control(1,val*16);
    }
}
function minus_brightness()
{
    val=brightness_input.value;
    if (val-->0)
    {
        brightness_input.value=val;
        camera_control(1,val*16);
    }
}
function plus_contrast()
{
    val=contrast_input.value;
    if (val++<6)
    {
        contrast_input.value=val;
        camera_control(2,val);
    }
}
function minus_contrast()
{
    val=contrast_input.value;
    if (val-->0)
    {
        contrast_input.value=val;
        camera_control(2,val);
    }
}
function body_onload()
{
    gocenter.title=top.str_center;
    vpatrol.title=top.str_vertical_patrol;
    vpatrolstop.title=top.str_stop_vertical_patrol;
    hpatrol.title=top.str_horizon_patrol;
    hpatrolstop.title=top.str_stop_horizon_patrol;
    switchon.title=top.str_switchon;
    switchoff.title=top.str_switchoff;
    resolution_sel.value=resolution;
    mode_sel.value=mode;
    brightness_input.value=Math.round(brightness / 16);
    contrast_input.value=contrast;
    image_reversal.checked=(flip&0x01)?true:false;
    image_mirror.checked=(flip&0x02)?true:false;
}