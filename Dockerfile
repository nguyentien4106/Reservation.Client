FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base

WORKDIR /app

EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 as build

ARG BUILD_CONFIGURATION=Release

WORKDIR /src 

COPY ["Reservation.API/Reservation.API.csproj", "Reservation.API/"] 
COPY ["Reservation.Infrastructure/Reservation.Infrastructure.csproj", "Reservation.API/"] 
COPY ["Reservation.Application/Reservation.Application.csproj", "Reservation.API/"] 
COPY ["Reservation.Domain/Reservation.Domain.csproj", "Reservation.API/"] 

RUN dotnet restore "Reservation.API/Reservation.API.csproj"

COPY . .

WORKDIR "/src/Reservation.API"

RUN dotnet build "Reservation.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Reservation.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base AS final

WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT [ "dotnet", "Reservation.API.dll" ]