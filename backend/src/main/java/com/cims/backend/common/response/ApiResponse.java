package com.cims.backend.common.response;

import lombok.Getter;

/**
 * API 공통 응답 객체
 * 모든 API는 success, data, message 형식으로 응답한다.
 */
@Getter
public class ApiResponse<T> {

    private final boolean success;
    private final T data;
    private final String message;

    private ApiResponse(boolean success, T data, String message) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    /**
     * 데이터가 포함된 성공 응답
     */
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }

    /**
     * 데이터가 없는 성공 응답
     */
    public static ApiResponse<Void> success() {
        return new ApiResponse<>(true, null, null);
    }

    /**
     * 실패 응답
     */
    public static ApiResponse<Void> fail(String message) {
        return new ApiResponse<>(false, null, message);
    }
}