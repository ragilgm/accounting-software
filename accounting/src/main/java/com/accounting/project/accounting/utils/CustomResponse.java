package com.accounting.project.accounting.utils;

import java.io.Serializable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;

public class CustomResponse extends ResponseEntity<Object> implements Serializable {

    private static final long serialVersionUID = 7156526077883281625L;

    public CustomResponse(HttpStatus status) {
        super(status);
    }

    public CustomResponse(Object body, HttpStatus status) {
        super(body, status);
    }

    public CustomResponse(MultiValueMap<?, ?> headers, HttpStatus status) {
        super(headers, status);
    }

    public CustomResponse(Object body, MultiValueMap<String, String> headers, HttpStatus status) {
        super(body, headers, status);
    }
}