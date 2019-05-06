/**
 * Copyright (C), 2016-2019, guazi.com
 * Description:
 */
package com.shishuo.cms.util;

import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * 〈一句话功能简述〉<br> 
 *
 * @author taox
 * @date 2019/5/5
 * @since 1.0
 */
public class PicUtils {

    protected static final Logger logger = Logger.getLogger(PicUtils.class);



    public static byte[] compressPicForScale(File srcPicFile, long desFileSize) {
        try {
            byte[] imageBytes = FileUtils.readFileToByteArray(srcPicFile);
            int[] widthHeigh = getwh(srcPicFile);
            return compressPicForScale(imageBytes,widthHeigh[0],desFileSize);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 根据指定大小压缩图片
     *
     * @param imageBytes  源图片字节数组
     * @param desFileSize 指定图片大小，单位kb
     * @return 压缩质量后的图片字节数组
     */
    public static byte[] compressPicForScale(byte[] imageBytes, int srcWidth, long desFileSize) {
        if (imageBytes == null || imageBytes.length <= 0 || imageBytes.length < desFileSize * 1024) {
            return imageBytes;
        }

        double scale = getScale(srcWidth);
        logger.info(String.format("srcWidth = %s , scale = %s ", srcWidth, scale));

        int cmpCount = 0;
        try {
            while (imageBytes.length > desFileSize * 1024) {
                long srcSize = imageBytes.length;
                double accuracy = getAccuracy(imageBytes.length / 1024);

                ByteArrayInputStream inputStream = new ByteArrayInputStream(imageBytes);
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream(imageBytes.length);
                Thumbnails.of(inputStream)
                        .scale(scale)
                        .outputQuality(accuracy)
                        .toOutputStream(outputStream);
                imageBytes = outputStream.toByteArray();
                logger.info(String.format("【图片压缩】| 图片原大小=%skb | 压缩后大小=%skb | accuracy=%s | scale=%s",
                        srcSize / 1024, imageBytes.length / 1024 , accuracy,scale ));

                //重置
                scale = 1;
                cmpCount++;

                if(cmpCount >= 2){
                    break;
                }
            }

        } catch (Exception e) {
            logger.error("【图片压缩】msg=图片压缩失败!", e);
        }
        return imageBytes;
    }

    /**
     * 自动调节精度(经验数值)
     *
     * @param size 源图片大小
     * @return 图片压缩质量比
     */
    private static double getAccuracy(long size) {
        double accuracy;
        if (size < 900) {
            accuracy = 0.8;
        } else if (size < 2047) {
            accuracy = 0.6;
        } else if (size < 3275) {
            accuracy = 0.4;
        } else {
            accuracy = 0.3;
        }
        return accuracy;
    }

    private static double getScale(int srcWidth){
        double scale = 1.0;
        if(srcWidth > 800){
            double w = 800.0 / srcWidth;
            scale = new BigDecimal(w).setScale(2, RoundingMode.UP).doubleValue();
        }
        return scale;
    }

    private static int[] getwh(File picFile) throws IOException {
        // 计算宽高
        BufferedImage bim = ImageIO.read(picFile);
        int srcWdith = bim.getWidth();
        int srcHeigth = bim.getHeight();
        return new int[]{srcWdith,srcHeigth};
    }


    public static void main(String[] args) throws IOException {
        File file = new File("/Users/taox/pic/1.jpg");
        long l = System.currentTimeMillis();
        byte[] bytes = PicUtils.compressPicForScale(file,30);// 图片小于30kb
        System.out.println(System.currentTimeMillis() - l);
        FileUtils.writeByteArrayToFile(new File("/Users/taox/pic/dd1.jpg"), bytes);
    }

}