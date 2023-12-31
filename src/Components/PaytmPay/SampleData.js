"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Copyright (C) 2019 Paytm.
 */
const Paytm = require("paytm-pg-node-sdk");
/* class: SampleData */
class SampleData {
    /**
     * @return string
     */
    static getEChannelId() {
        return Paytm.EChannelId.WEB;
    }
    /**
     * @return Money
     */
    static getMoney() {
        return Paytm.Money.constructWithCurrencyAndValue(Paytm.EnumCurrency.INR, "1.00");
    }
    /**
     * @return string
     */
    static getOrderId() {
        return SampleData.generateRandomString(10);
    }
    /**
     * @return UserInfo
     */
    static getUserInfo() {
        var userInfo = new Paytm.UserInfo("cid");
        userInfo.setAddress("address str");
        userInfo.setEmail("abc@xyz.com");
        userInfo.setFirstName("JOHN");
        userInfo.setLastName("MILLER");
        userInfo.setMobile("1234567890");
        userInfo.setPincode("123123");
        return userInfo;
    }
    /**
     * @return string
     */
    static getPaytmSsoToken() {
        return "SSOTokenValue"; // should be replaced with actual value of paytm sso token
    }
    /**
     * @return string
     */
    static getPromocode() {
        return "PromoCodeValue";
    }
    /**
     * @return string
     */
    static getEmiOption() {
        return "EmiValue";
    }
    /**
     * @return string
     */
    static getCardTokenRequired() {
        return "TokenValue";
    }
    /**
     * @return array of PaymentMode
     */
    static getEnablePaymentModes() {
        var paymentMode1 = new Paytm.PaymentMode();
        paymentMode1.setMode("CC");
        var channels1 = [Paytm.EChannelId.WEB, Paytm.EChannelId.APP];
        paymentMode1.setChannels(channels1);
        var paymentMode2 = new Paytm.PaymentMode();
        paymentMode2.setMode("CC");
        var channels2 = [Paytm.EChannelId.WEB, Paytm.EChannelId.APP];
        paymentMode2.setChannels(channels2);
        var enableMode = [paymentMode1, paymentMode2];
        return enableMode;
    }
    /**
     * @return array of PaymentMode
     */
    static getdisablePaymentModes() {
        var paymentMode1 = new Paytm.PaymentMode();
        paymentMode1.setMode("CC");
        var channels1 = [Paytm.EChannelId.WEB, Paytm.EChannelId.APP];
        paymentMode1.setChannels(channels1);
        var paymentMode2 = new Paytm.PaymentMode();
        paymentMode2.setMode("CC");
        var channels2 = [Paytm.EChannelId.WEB, Paytm.EChannelId.APP];
        paymentMode2.setChannels(channels2);
        var disableMode = [paymentMode1, paymentMode2];
        return disableMode;
    }
    /**
     * @return array of GoodsInfo
     */
    static getGoodsInfo() {
        var goodsInfo1 = new Paytm.GoodsInfo();
        goodsInfo1.setMerchantGoodsId("goods_id1");
        goodsInfo1.setMerchantShippingId("shipping_id1");
        goodsInfo1.setSnapshotUrl("snapshot_url");
        goodsInfo1.setDescription("desc");
        goodsInfo1.setCategory("category");
        goodsInfo1.setQuantity("qty");
        goodsInfo1.setUnit("unit");
        goodsInfo1.setPrice(SampleData.getMoney());
        goodsInfo1.setExtendInfo(SampleData.getExtendInfo());
        var goodsInfo2 = new Paytm.GoodsInfo();
        goodsInfo2.setMerchantGoodsId("goods_id2");
        goodsInfo2.setMerchantShippingId("shipping_id2");
        goodsInfo2.setSnapshotUrl("url");
        goodsInfo2.setDescription("description");
        goodsInfo2.setCategory("category");
        goodsInfo2.setQuantity("quantity");
        goodsInfo2.setUnit("unit");
        goodsInfo2.setPrice(SampleData.getMoney());
        goodsInfo2.setExtendInfo(SampleData.getExtendInfo());
        var goods = [goodsInfo1, goodsInfo2];
        return goods;
    }
    /**
     * @return array of ShippingInfo
     */
    static getShippingInfo() {
        var shippingInfo1 = new Paytm.ShippingInfo();
        shippingInfo1.setFirstName("fname");
        shippingInfo1.setLastName("lname");
        shippingInfo1.setEmail("abc@xyz.com");
        shippingInfo1.setMerchantShippingId("id1");
        shippingInfo1.setAddress1("Address 1");
        shippingInfo1.setAddress2("Address 2");
        shippingInfo1.setCarrier("Carrier 1");
        //set charge amount as per your amount and then get money
        shippingInfo1.setChargeAmount(SampleData.getMoney());
        shippingInfo1.setCityName("Abc");
        shippingInfo1.setStateName("Xyz");
        shippingInfo1.setMobileNo("1234567890");
        shippingInfo1.setTrackingNo("1122334455");
        var shippingInfo2 = new Paytm.ShippingInfo();
        shippingInfo2.setFirstName("firstname");
        shippingInfo2.setLastName("lastname");
        shippingInfo2.setEmail("xyz@abc.com");
        shippingInfo2.setMerchantShippingId("id2");
        shippingInfo2.setAddress1("Address Line 1");
        shippingInfo2.setAddress2("Address Line 2");
        shippingInfo2.setCarrier("Carrier 2");
        //set charge amount as per your amount and then get money
        shippingInfo2.setChargeAmount(SampleData.getMoney());
        shippingInfo2.setCityName("Efg");
        shippingInfo2.setStateName("Jkl");
        shippingInfo2.setMobileNo("2345678901");
        shippingInfo2.setTrackingNo("2233445566");
        var info = [shippingInfo1, shippingInfo2];
        return info;
    }
    /**
     * @return ExtendInfo
     */
    static getExtendInfo() {
        var extendInfo = new Paytm.ExtendInfo();
        extendInfo.setUdf1('udf1');
        extendInfo.setUdf2('udf2');
        extendInfo.setUdf3('udf3');
        extendInfo.setMercUnqRef('mercUnqRef');
        extendInfo.setComments('comment');
        extendInfo.setAmountToBeRefunded('1');
        var subwalletAmount = {};
        subwalletAmount[Paytm.Request.FOOD_WALLET] = '2';
        subwalletAmount[Paytm.Request.GIFT_WALLET] = '2.5';
        extendInfo.setSubwalletAmount(subwalletAmount);
        return extendInfo;
    }
    /**
     * @param int count
     * @return string
     */
    static generateRandomString(count) {
        var ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var charactersLength = ALPHA_NUMERIC_STRING.length;
        var rand = '';
        for (var i = 0; i < count; i++) {
            var start = Math.floor(Math.random() * charactersLength) + 1;
            rand += ALPHA_NUMERIC_STRING.substr(start, 1);
        }
        return rand;
    }
    /**
     * @return object
     */
    static getSubWalletAmount() {
        var subWalletAmount = {};
        subWalletAmount[Paytm.UserSubWalletType.FOOD] = 1.00;
        subWalletAmount[Paytm.UserSubWalletType.GIFT] = 1.00;
        return subWalletAmount;
    }
    /**
     * @return object
     */
    static getExtraParamsMap() {
        var extraParamsMap = {};
        extraParamsMap["data"] = "data";
        extraParamsMap["purpose"] = "merchant purpose";
        return extraParamsMap;
    }
}
export {SampleData}