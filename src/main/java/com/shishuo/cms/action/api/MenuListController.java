package com.shishuo.cms.action.api;


import com.shishuo.cms.action.manage.ManageBaseAction;
import com.shishuo.cms.constant.FolderConstant;
import com.shishuo.cms.entity.Folder;
import com.shishuo.cms.entity.vo.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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

    @RequestMapping(value = "/getMenuByename", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getMenuByename(String ename){
        try{
            Folder folder =  this.folderService.getFolderByEname(ename);

            if(folder == null) {
                throw new NoSuchElementException("不存在该名称对应的目录");
            }
            FolderVo folderVo = this.folderService.getFolderById(folder.getFolderId());
            List<FolderVo> childFolderList = this.folderService.getFolderListByFatherId(folderVo.getFolderId(),null);
            if(childFolderList!=null){
                folderVo.setFolderList(childFolderList);
                for(FolderVo cld : childFolderList){
                    List<FolderVo> list = this.folderService.getFolderListByFatherId(cld.getFolderId(),null);
                    if(list!=null){
                        cld.setFolderList(list);
                    }
                }
            }
            return WebReturnObject.getInstanceForSuccess(folderVo);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }


    @RequestMapping(value = "/getMenuById", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getMenuById(long id){
        try{
            FolderVo folderVo =  this.folderService.getFolderById(id);
            List<FolderVo> childFolderList = this.folderService.getFolderListByFatherId(folderVo.getFolderId(),null);
            if(childFolderList!=null){
                folderVo.setFolderList(childFolderList);
                for(FolderVo cld : childFolderList){
                    List<FolderVo> list = this.folderService.getFolderListByFatherId(cld.getFolderId(),null);
                    if(list!=null){
                        cld.setFolderList(list);
                    }
                }
            }
            return WebReturnObject.getInstanceForSuccess(folderVo);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }


    @RequestMapping(value = "/getArticleByMenuId", method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public WebReturnObject getArticleByMenuId(long folderId,Integer pageNum , Integer pageSize){
        try{
            pageNum = pageNum==null?1:pageNum;
            pageSize = pageSize==null?10:pageSize;
            FolderVo folderVo =  this.folderService.getFolderById(folderId);
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
    public WebReturnObject getArticleById(int id){
        try{
            ArticleVo articleVo = this.articleService.getArticleById(id);
            return WebReturnObject.getInstanceForSuccess(articleVo);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }

    @RequestMapping(value = "/getAllArticleInDevice", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getAllArticleInDevice(){
        try{
            Integer pageNum = 1;
            Integer pageSize = Integer.MAX_VALUE;

            Folder folder = this.folderService.getFolderByEname(Constants.GSSBSL_NAME);
            List<FolderVo> list =  this.folderService.getFolderListByFatherId(folder.getFolderId(), FolderConstant.status.display);

            List<ArticleVo> dataList = new ArrayList<ArticleVo>();
            for(FolderVo folderVo : list){
                PageVo<ArticleVo> pageList = this.articleService.getArticlePageByFolderId(folderVo.getFolderId(),pageNum,pageSize);
                dataList.addAll(pageList.getList());
            }
            return WebReturnObject.getInstanceForSuccess(dataList);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }

    @RequestMapping(value = "/getPeopleList", method = RequestMethod.GET)
    @ResponseBody
    public WebReturnObject getPeopleList(Integer pageNum , Integer pageSize){
        try{
            pageNum = pageNum==null?1:pageNum;
            pageSize = pageSize==null?200:pageSize;
            Folder folder  =  this.folderService.getFolderByEname(Constants.RYSL_NAME);
            PageVo<ArticleVo> pageList = this.articleService.getArticlePageByFolderId(folder.getFolderId(),pageNum,pageSize);
            return WebReturnObject.getInstanceForSuccess(pageList);
        }catch (Exception e){
            return WebReturnObject.getInstanceForError("返回错误",e.getMessage());
        }
    }

}
