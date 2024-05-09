namespace Reservation.Server.Models.DTO.Auth
{
    public class AppResponse<T>
    {
        public bool IsSucceed { get; private set; } = true;
        public Dictionary<string, string[]> Messages { get; private set; } = [];

        public int ErrorCode { get; private set; } = 200;

        public T? Data { get; private set; }
        internal AppResponse<T> SetSuccessResponse(T data)
        {
            Data = data;
            return this;
        }
        internal AppResponse<T> SetSuccessResponse(T data, string key, string value)
        {
            Data = data;
            Messages.Add(key, [value]);
            return this;
        }
        internal AppResponse<T> SetSuccessResponse(T data, Dictionary<string, string[]> message)
        {
            Data = data;
            Messages = message;
            return this;
        }
        internal AppResponse<T> SetSuccessResponse(T data, string key, string[] value)
        {
            Data = data;
            Messages.Add(key, value);
            return this;
        }
        internal AppResponse<T> SetErrorResponse(string key, string value)
        {
            IsSucceed = false;
            Messages.Add(key, [value]);
            return this;
        }
        internal AppResponse<T> SetErrorResponse(string key, string value, int code)
        {
            IsSucceed = false;
            ErrorCode = code;
            Messages.Add(key, [value]);
            return this;
        }

        internal AppResponse<T> SetErrorResponse(string key, string[] value)
        {
            IsSucceed = false;
            Messages.Add(key, value);
            return this;
        }

        internal AppResponse<T> SetErrorResponse(string key, string[] value, int code)
        {
            IsSucceed = false;
            ErrorCode = code;
            Messages.Add(key, value);
            return this;
        }
        internal AppResponse<T> SetErrorResponse(Dictionary<string, string[]> message)
        {
            IsSucceed = false;
            Messages = message;
            return this;
        }
        internal AppResponse<T> SetErrorResponse(Dictionary<string, string[]> message, int code)
        {
            IsSucceed = false;
            Messages = message;
            ErrorCode = code;
            return this;
        }
    }
}
