package com.shishuo.cms.action.api;


import com.shishuo.cms.action.manage.ManageBaseAction;
import com.shishuo.cms.constant.FolderConstant;
import com.shishuo.cms.entity.Folder;
import com.shishuo.cms.entity.vo.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/menu")
public class MenuListController extends ManageBaseAction {


    @RequestMapping(value = "/getRootList", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getMenuList(){
        try{
            List<FolderVo> list =  this.folderService.getFolderListByFatherId(0, FolderConstant.status.display);
            return WebReturnObject.getInstanceForSuccess(list);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }


    @RequestMapping(value = "/getDeviceList", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getDeviceList(){
        try{
            Folder folder = this.folderService.getFolderByEname(Constants.GSSBSL_NAME);

            List<FolderVo> list =  this.folderService.getFolderListByFatherId(folder.getFolderId(), FolderConstant.status.display);
            return WebReturnObject.getInstanceForSuccess(list);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }



    @RequestMapping(value = "/getMenuById", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getMenuById(long id){
        try{
            FolderVo folderVo =  this.folderService.getFolderById(id);
            return WebReturnObject.getInstanceForSuccess(folderVo);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }


    @RequestMapping(value = "/getArticleByMenuId", method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public WebReturnObject getArticleByMenuId(long menuId,Integer pageNum , Integer pageSize){
        try{
            pageNum = pageNum==null?1:pageNum;
            pageSize = pageSize==null?10:pageSize;
            FolderVo folderVo =  this.folderService.getFolderById(menuId);
            PageVo<ArticleVo> pageList = this.articleService.getArticlePageByFolderId(folderVo.getFolderId(),pageNum,pageSize);
            return WebReturnObject.getInstanceForSuccess(pageList);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }

    }


    @RequestMapping(value = "/getAnnouncementList", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getAnnouncementList(Integer pageNum , Integer pageSize){
        try{
            pageNum = pageNum==null?1:pageNum;
            pageSize = pageSize==null?10:pageSize;
            Folder folder = this.folderService.getFolderByEname(Constants.ANNOUNCEMENT_NAME);
            PageVo<ArticleVo> pageList = this.articleService.getArticlePageByFolderId(folder.getFolderId(),pageNum,pageSize);
            return WebReturnObject.getInstanceForSuccess(pageList);

        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }


    @RequestMapping(value = "/getArticleById", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getAnnouncementList(int id){
        try{
            ArticleVo articleVo = this.articleService.getArticleById(id);
            return WebReturnObject.getInstanceForSuccess(articleVo);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }




}
