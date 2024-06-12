
FROM mcr.microsoft.com/dotnet/sdk:8.0
COPY ./output /publish
WORKDIR /publish

EXPOSE 5175
ENTRYPOINT ["dotnet", "Reservation.Server.dll"]