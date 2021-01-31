package com.accounting.project.accounting.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormating {

	public static String dateFormat(Date paremater) throws ParseException {
		SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
		SimpleDateFormat outputFormat = new SimpleDateFormat("dd-MM-yyyy");
		paremater = inputFormat.parse("2018-04-10T04:00:00.000Z");
		String formattedDate = outputFormat.format(paremater);
		System.out.println(formattedDate); // prints 10-04-2018
		return formattedDate;
	}

}
