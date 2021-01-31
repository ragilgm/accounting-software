package com.accounting.project.accounting.utils;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;

public class BalanceFormat {

	public static String balanceString(String currencySymbol,double balance) {
        DecimalFormat kurs = (DecimalFormat) DecimalFormat.getCurrencyInstance();
        DecimalFormatSymbols format = new DecimalFormatSymbols();
        format.setCurrencySymbol(currencySymbol+" ");
        format.setMonetaryDecimalSeparator(',');
        format.setGroupingSeparator('.');
        kurs.setDecimalFormatSymbols(format);
        return kurs.format(balance);
	}

}
