package com.shishuo.cms.entity.vo;

public class WebReturnObject {

	public boolean success = true;
	
	public String error = "";
	
	public String errorMsg = "";
	
	public Object data = null;
	
	private WebReturnObject() {
	}
	
	/**
	 * 成功标记的对象
	 * @param data 成功时返回的数据
	 * @return
	 */
	public static WebReturnObject getInstanceForSuccess(Object data) {
		WebReturnObject ret = new WebReturnObject();
		ret.success = true;
		ret.data = data;
		return ret;
	}
	
	public static WebReturnObject getInstanceForError(String errorMsg, String error) {
		WebReturnObject ret = new WebReturnObject();
		ret.success = false;
		ret.errorMsg = errorMsg;
		ret.error = error;
		return ret;
	}

    public static WebReturnObject getInstanceForError(String errorMsg, String error, Object data) {
        WebReturnObject ret = new WebReturnObject();
        ret.success = false;
        ret.errorMsg = errorMsg;
        ret.error = error;
        ret.data = data;
        return ret;
    }
}
